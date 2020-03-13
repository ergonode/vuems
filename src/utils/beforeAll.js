/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { join } from 'path';
import { exists, ensureDir } from 'fs-extra';
import { prepareSymlinks, getConfigs } from '../helpers/tools';
import { DIRECTORIES } from '../helpers/constants';

/**
* Created symlinks for npm modules
* @async
* @function symlinksCreator
* @param {Object} options - Module options
* @param {Object} options.modules - Main modules
* @param {string} options.vendorDir - Temporary node modules directory (symlinks)
* @param {string} options.nodeModulesDir - Directory to find npm modules
* @returns {Promise<string>}
*/
async function symlinksCreator({
    modules: {
        npm: npmModules,
    },
    vendorDir,
    nodeModulesDir,
}) {
    await ensureDir(vendorDir, 0o2775); // Ensure vendor directory exists
    await Promise.all(prepareSymlinks({ npmModules, vendorDir, nodeModulesDir }));

    return 'Symlinks created';
}

/**
* Check main directories
* @async
* @function checkDirectories
* @param {Object} options - Module options
* @param {Object} options.modules - All active modules
* @param {string} options.modulesDir - Main modules directory
* @param {string} options.vendorDir - Temporary node modules directory (symlinks)
* @throws {string} Will throw an error if required main directories not exist
* @returns {Promise<string>}
*/
async function checkDirectories({ modules, modulesDir, vendorDir }) {
    const isModuleDir = await exists(modulesDir);
    const isVendorDir = await exists(vendorDir);

    if (modules.local && modules.local.length && !isModuleDir) {
        throw Error(`Local modules directory [${modulesDir}] does not exist.`);
    }
    if (modules.npm && modules.npm.length && !isVendorDir) {
        throw Error(`Vendor directory [${vendorDir}] does not exist.`);
    }

    return 'Directories checked';
}

/**
* Check required modules
* @function checkRequiredModules
* @param {Object} options - Module options
* @param {Object} options.modules - All active modules
* @param {string[]} options.required - Required modules
* @throws {string} Will throw an error if required module not exist
* @returns {Promise<string>}
*/
function checkRequiredModules({ allModules, required }) {
    return new Promise((resolve, reject) => {
        required.forEach((module) => {
            if (!allModules.some(e => e.name === module)) {
                reject(new Error(`Required module [${module}] does not exist.`));
            }
        });
        resolve('All required modules exist');
    });
}

/**
* Get module configuration
* @async
* @function getModulesConfiguration
* @param {Object} options - Module options
* @param {Object} options.allModules - All active modules
* @returns {Promise<Object[]>} All modules configurations
*/
async function getModulesConfiguration({ allModules, directories }) {
    const configDir = directories.config || DIRECTORIES.config;
    const config = await Promise.all(getConfigs({ modules: allModules, suffix: `${configDir}/index.js` }));

    return config;
}

/**
* Check modules relations
* @function checkModulesRelations
* @param {Object[]} configs - All modules configurations
* @throws {string} Will throw an error if relations are incorrect
* @returns {Promise<string>}
*/
function checkModulesRelations(configs) {
    return new Promise((resolve) => {
        configs.forEach((config) => {
            if (config.relations) {
                config.relations.forEach((relation) => {
                    if (relation && !configs.find(c => c.name === relation)) {
                        throw Error(`Module [${config.name}] has relation with [${relation}].\n Module [${relation}] does not exist.`);
                    }
                });
            }
        });
        resolve('All relations correct');
    });
}

/**
* Set aliases for modules
* @function setAliases
* @param {Object[]} configurations - All modules configurations
* @param {Object} options - Module options
* @param {string} options.allModules - All active modules
* @returns {Promise<string>}
*/
async function setAliases(configurations, { allModules }) {
    await this.extendBuild((config) => {
        const alias = config.resolve.alias || {};

        configurations.forEach((configuration) => {
            if (configuration.aliases) {
                const { name, aliases } = configuration;

                Object.keys(aliases).forEach((key) => {
                    alias[key] = join(allModules.find(m => m.name === name).path, aliases[key]).replace(/\/$/g, '');
                });
            }
        });
    });

    return 'All aliases set';
}

/**
* Run actions before any modules are loaded
* @function beforeAllModule
* @param {Object} moduleOptions - Module options
* @returns {Promise<Object>}
*/
export default async function beforeAllModule(moduleOptions) {
    const message = {};

    if (moduleOptions.modules.npm && moduleOptions.modules.npm.length) {
        message.symlinksCreator = await symlinksCreator(moduleOptions);
    }
    message.checkDirectories = await checkDirectories(moduleOptions);
    message.checkRequiredModules = await checkRequiredModules(moduleOptions);
    const modulesConfigs = await getModulesConfiguration(moduleOptions);

    message.checkModulesRelations = await checkModulesRelations(modulesConfigs);
    message.setAliases = await setAliases.call(this, modulesConfigs, moduleOptions);

    return message;
}

/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { join } from 'path';
import { log } from '../helpers/log';

/**
* Check modules relations
* @function checkModulesRelations
* @param {Object[]} configs - All modules configurations
* @throws {string} Will throw an error if relations are incorrect
* @returns {Promise<string>}
*/
function checkModulesRelations({ configurations }) {
    return new Promise((resolve) => {
        configurations.forEach((config) => {
            if (config.relations) {
                config.relations.forEach((relation) => {
                    if (relation && !configurations.find(c => c.name === relation)) {
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
            const { name } = configuration;

            if (configuration.aliases) {
                const { aliases } = configuration;

                Object.keys(aliases).forEach((key) => {
                    alias[key] = join(allModules.find(m => m.name === name).path, aliases[key]).replace(/\/$/g, '');
                });
            }

            if (configuration.replacements) {
                const { replacements } = configuration;

                Object.keys(replacements).forEach((key) => {
                    alias[key] = join(allModules.find(m => m.name === name).path, replacements[key]).replace(/\/$/g, '');
                });
            }
        });
    });

    return 'All aliases set';
}

/**
* Set plugins for modules
* @function setPlugins
* @param {Object[]} configurations - All modules configurations
* @param {Object} options - Module options
* @param {string} options.allModules - All active modules
* @returns {Promise<string>}
*/
async function setPlugins(configurations, { allModules }) {
    return new Promise((resolve) => {
        configurations.forEach((configuration) => {
            if (configuration.plugins) {
                const { name, plugins } = configuration;
                const moduleName = name.replace(/[^a-zA-Z]/g, '');

                plugins.forEach(async ({ ssr, src }) => {
                    const pluginPath = join(allModules.find(m => m.name === name).path, src).replace(/\/$/g, '');

                    await this.addPlugin({
                        src: `${pluginPath}.js`,
                        fileName: join('modules', moduleName, `${src}.js`),
                        ssr,
                    });
                });
            }
        });
        resolve('All plugins set');
    });
}

/**
* Set global css for modules
* @function setCss
* @param {Object[]} configurations - All modules configurations
* @param {Object} options - Module options
* @param {string} options.allModules - All active modules
* @returns {Promise<string>}
*/
function setCss(configurations, { allModules }) {
    const setCssPath = ({ path, name }) => {
        const finalPath = join(
            allModules.find(m => m.name === name).path,
            path,
        ).replace(/\/$/g, '');

        this.options.css.push(finalPath);
    };
    const getCssPaths = ({ name, css }) => {
        if (css && name) {
            css.forEach(path => setCssPath({ path, name }));
        }
    };

    return new Promise((resolve) => {
        configurations.forEach(getCssPaths);

        resolve('All global css set');
    });
}

/**
* Prepare modules
* @function prepareModules
* @param {Object} params - Data needed to load the module
* @param {Object} params.configurations - Initial modules configurations
* @param {Object} params.options - VueMS initial options
*/
export default async function prepareModules({ configurations, options }) {
    const { verbose } = options;
    const logs = await Promise.all([
        checkModulesRelations({ configurations }),
        setAliases.call(this, configurations, options),
        setPlugins.call(this, configurations, options),
        setCss.call(this, configurations, options),
    ]);

    if (verbose) {
        log({
            header: 'Prepare modules',
            logs: logs.filter(x => !!x),
        });
    }
}

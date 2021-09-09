/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { resolve as resolvePath, join as joinPath } from 'path';
import recursive from 'recursive-readdir-async';
import { existsSync, remove, ensureSymlink, chmod } from 'fs-extra';
import { success } from 'consola';
import { DEFAULTS, DIRECTORIES } from './constants';

/**
 * Load configuration for all modules
 * @function getConfigs
 * @param {Object} options
 * @param {Object[]} options.modules -  Modules to load
 * @param {string} options.suffix - Path suffix
 * @throws {string} Will throw an error if module configuration file not exist
 * @returns {Promise<Object[]>}
 */
function getConfigs({ modules, suffix }) {
    return modules.map(async ({ name, path }) => {
        const fullPath = joinPath(path, suffix);

        if (existsSync(fullPath)) {
            const moduleConfig = await import(`${fullPath}`);

            return moduleConfig.default;
        }
        throw Error(`Module [${name}] configuration file does not exist.`);
    });
}

/**
 * Find a specific path for all modules
 * @function findPaths
 * @param {Object} options
 * @param {Object[]} options.modules - Modules to load
 * @param {string} options.prefix - Path prefix
 * @param {string} options.suffix - Path suffix
 * @param {RegExp} options.regExp - RegExp for file searching
 * @returns {Promise<Object[]>}
 */
export function findPaths({ modules, suffix, regExp }) {
    return modules.map(async ({ path }) => {
        const fullPath = joinPath(path, suffix);

        if (existsSync(fullPath)) {
            const files = await recursive.list(fullPath);

            return (
                files.filter(({ fullname }) => regExp.test(fullname)) || null
            );
        }
        return null;
    });
}

/**
 * Prepare symlinks for all npm modules
 * @function prepareSymlinks
 * @param {Object} options
 * @param {Object[]} options.npmModules - Npm modules to load
 * @param {string} options.vendorDir - Temporary node modules directory (symlinks)
 * @param {string} options.nodeModulesDir - Directory to find npm module
 * @returns {Promise<Object[]>}
 */
export function prepareSymlinks({ npmModules, vendorDir, nodeModulesDir }) {
    return npmModules.map(async (module) => {
        const src = resolvePath(nodeModulesDir, module.src || module);
        const dst = resolvePath(vendorDir, module);

        if (existsSync(src)) {
            await remove(dst);
            await ensureSymlink(src, dst, 'junction');
            const files = await recursive.list(dst);

            await Promise.all(
                files.map(({ fullname }) => chmod(fullname, 0o644)),
            );
        }
    });
}

/**
 * Flat array
 * @function flattenDeep
 * @param {Object[]} arr -  Array to flatten
 * @returns {Object[]}
 */
export function flattenDeep(arr) {
    return arr.reduce(
        (acc, val) =>
            Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val),
        [],
    );
}

/**
 * Get module configuration
 * @async
 * @function getModulesConfig
 * @param {Object} options - Module options
 * @param {Object} options.allModules - All active modules
 * @param {Object} options.directories - Directories names
 * @param {Boolean} options.verbose - Flag to showing logs
 * @returns {Promise<Object[]>} All modules configurations
 */
export async function getModulesConfig({ allModules, directories, verbose }) {
    const configDir = directories.config || DIRECTORIES.config;
    const configs = await Promise.all(
        getConfigs({ modules: allModules, suffix: `${configDir}/index.js` }),
    ).then((config) => {
        if (verbose) {
            success('Modules configurations loaded');
        }

        return config;
    });

    return configs;
}

/**
 * Prepare VueMS options
 * @function prepareOptions
 * @param {Object} moduleOptions - Module options
 * @returns {Object} Prepared options
 */
export function prepareOptions(moduleOptions) {
    const options = {
        ...DEFAULTS,
        ...(this.options.vuems || moduleOptions),
    };
    let localModules = options.modules.local || [];
    let npmModules = options.modules.npm || [];

    if (!localModules.length && !npmModules.length) return false;

    if (this.options.srcDir) {
        options.vendorDir = resolvePath(this.options.srcDir, options.vendorDir);
        options.modulesDir = resolvePath(
            this.options.srcDir,
            options.modulesDir,
        );
    }

    if (options.modules.npm) {
        npmModules = options.modules.npm.map((module) => ({
            name: module,
            type: 'npm',
            path: joinPath(options.vendorDir, module, 'src'),
        }));
    }

    if (options.modules.local) {
        localModules = options.modules.local.map((module) => {
            const path = joinPath(options.modulesDir, module, 'src');

            if (existsSync(path)) {
                return {
                    name: module,
                    type: 'local',
                    path,
                };
            }

            return {
                name: module,
                type: 'local',
                path: joinPath(options.modulesDir, module),
            };
        });
    }

    options.allModules = [...localModules, ...npmModules];

    return options;
}

/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    resolve as resolvePath,
    join as joinPath,
} from 'path';
import recursive from 'recursive-readdir-async';
import {
    existsSync, remove, ensureSymlink, chmod,
} from 'fs-extra';

/**
* Load modules from path
* @function loadModules
* @param {Object} options
* @param {Object[]} options.modules - Modules to load
* @param {string} options.options - All global options
* @returns {Promise<Object[]>}
*/
export function loadModules({ modules, options, configurations }) {
    return modules
        .map((data) => ({
              ...data,
              order: configurations.find(m => m.name === data.name).order || 1000,
        }))
        .sort((a, b) => a.order - b.order)
        .map(async ({ name, path }) => {
            const {
                beforeModule = null,
                default: moduleFn,
                afterModule = null,
            } = await import(`${path}`);

            if (beforeModule) {
                await beforeModule.call(this, options);
            }

            await moduleFn.call(this, options);

            if (afterModule) {
                await afterModule.call(this, options);
            }

            return `Module [${name}] loaded`;
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
export function findPaths({
    modules, suffix, regExp,
}) {
    return modules.map(async ({ path }) => {
        const fullPath = joinPath(path, suffix);

        if (existsSync(fullPath)) {
            const files = await recursive.list(fullPath);

            return files.filter(({ fullname }) => regExp.test(fullname)) || null;
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

            await Promise.all(files.map(({ fullname }) => {
                return chmod(fullname, 0o444); // files only to read
            }));
        }
    });
}

/**
* Load configuration for all modules
* @function getConfigs
* @param {Object} options
* @param {Object[]} options.modules -  Modules to load
* @param {string} options.suffix - Path suffix
* @throws {string} Will throw an error if module configuration file not exist
* @returns {Promise<Object[]>}
*/
export function getConfigs({ modules, suffix }) {
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
* Flat array
* @function flattenDeep
* @param {Object[]} arr -  Array to flatten
* @returns {Object[]}
*/
export function flattenDeep(arr) {
    return arr.reduce((acc, val) => (Array.isArray(val)
        ? acc.concat(flattenDeep(val))
        : acc.concat(val)
    ), []);
}

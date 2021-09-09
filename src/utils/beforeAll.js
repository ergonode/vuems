/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { existsSync, ensureDir } from 'fs-extra';
import { log } from '../helpers/log';
import { prepareSymlinks } from '../helpers/tools';

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
    modules: { npm: npmModules },
    vendorDir,
    nodeModulesDir,
}) {
    if (!npmModules || !npmModules.length) return null;

    await ensureDir(vendorDir, 0o2775); // Ensure vendor directory exists
    await Promise.all(
        prepareSymlinks({ npmModules, vendorDir, nodeModulesDir }),
    );

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
function checkDirectories({ modules, modulesDir, vendorDir }) {
    return new Promise((resolve, reject) => {
        const isModuleDir = existsSync(modulesDir);
        const isVendorDir = existsSync(vendorDir);

        if (modules.local && modules.local.length && !isModuleDir) {
            reject(
                new Error(
                    `Local modules directory [${modulesDir}] does not exist.`,
                ),
            );
        }
        if (modules.npm && modules.npm.length && !isVendorDir) {
            reject(
                new Error(`Vendor directory [${vendorDir}] does not exist.`),
            );
        }
        resolve('Directories checked');
    });
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
            if (!allModules.some((e) => e.name === module)) {
                reject(
                    new Error(`Required module [${module}] does not exist.`),
                );
            }
        });
        resolve('All required modules exist');
    });
}

/**
 * Run actions before any modules are loaded
 * @function beforeModules
 * @param {Object} params - Data needed to load the module
 * @param {Object} params.options - VueMS initial options
 */
export default async function beforeModules({ options }) {
    const { verbose } = options;
    const logs = await Promise.all([
        symlinksCreator(options),
        checkDirectories(options),
        checkRequiredModules(options),
    ]);

    if (verbose) {
        log({
            header: 'Before all modules',
            logs: logs.filter((x) => !!x),
        });
    }
}

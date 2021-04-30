/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { log } from '../helpers/log';

/**
 * Load modules from path
 * @function loadModules
 * @param {Object} options
 * @param {Object[]} options.modules - Modules to load
 * @param {string} options.options - All global options
 * @returns {Promise<Object[]>}
 */
function loadModules({ modules, options, configurations }) {
    const setOrder = (data) => ({
        ...data,
        order: configurations.find((m) => m.name === data.name).order || 1000,
    });
    const sortByOrder = (a, b) => a.order - b.order;
    const loadModule = async ({ name, path }) => {
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
    };

    return modules.map(setOrder).sort(sortByOrder).map(loadModule);
}

/**
 * Load all modules
 * @async
 * @function initModules
 * @param {Object} params - Data needed to load the module
 * @param {Object} params.configurations - Initial modules configurations
 * @param {Object} params.options - VueMS initial options
 */
export default async function initModules({ configurations, options }) {
    const { allModules, logLoadedModules, verbose } = options;

    const logs = await Promise.all(
        loadModules.call(this, {
            modules: allModules,
            options,
            configurations,
        }),
    );

    if (verbose) {
        log({
            header: 'Loading modules',
            logs: logLoadedModules
                ? logs.filter((x) => !!x)
                : 'All modules loaded',
        });
    }
}

/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { loadModules } from '../helpers/tools';

/**
* Load all modules
* @async
* @function initModules
* @param {Object} moduleOptions - Global options
* @returns {Promise<Object>}
*/
export default async function initModules(configurations, moduleOptions) {
    const message = {};
    const {
        allModules,
    } = moduleOptions;

    message.allModules = await Promise.all(
        loadModules.call(this,
            {
                modules: allModules,
                options: moduleOptions,
                configurations,
            }),
    );

    if (moduleOptions.logLoadedModules) {
        return message;
    }

    return { allModules: 'All modules loaded' };
}

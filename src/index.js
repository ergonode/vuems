/*
 * Copyright © Ergonode Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { info } from 'consola';
import { getModulesConfig, prepareOptions } from './helpers/tools';
import beforeModules from './utils/beforeAll';
import prepareModules from './utils/prepareModules';
import initModules from './utils/initModules';
import afterModules from './utils/afterAll';

/**
 * A simple mechanism to transform a monolithic Vue application into an application based on Micro Services architecture.
 * @author Piotr Bletek <p.bletek@gmail.com>
 * @function VueMS Vue Micro Services
 * @param {Object} moduleOptions - VueMS initial options
 */
export default async function VueMS(moduleOptions = {}) {
    const options = prepareOptions.call(this, moduleOptions);

    if (!options) {
        info('VueMS init - no modules to load');

        return false;
    }
    info('VueMS init');

    await beforeModules.call(this, {
        options,
    });

    const modulesConfigs = await getModulesConfig(options);

    await prepareModules.call(this, {
        configurations: modulesConfigs,
        options,
    });
    await initModules.call(this, {
        configurations: modulesConfigs,
        options,
    });
    await afterModules.call(this, {
        options,
    });
}

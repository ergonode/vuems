/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { resolve, join } from 'path';
import { existsSync } from 'fs-extra';
import { info } from 'consola';
import { log } from './helpers/log';
import { DEFAULTS } from './helpers/constants';
import beforeAll from './utils/beforeAll';
import initModules from './utils/initModules';
import afterAll from './utils/afterAll';

/**
 * A simple mechanism to transform a monolithic Vue application into an application based on Micro Services architecture.
 * @author Piotr Bletek <p.bletek@gmail.com>
 * @function VueMS Vue Micro Services
 * @param {Object} moduleOptions - Module options
 */
export default async function VueMS(moduleOptions = {}) {
    const options = { ...DEFAULTS, ...this.options.vuems || moduleOptions };
    let localModules = options.modules.local || [];
    let npmModules = options.modules.npm || [];

    if (this.options.srcDir) {
        options.vendorDir = resolve(this.options.srcDir, options.vendorDir);
        options.modulesDir = resolve(this.options.srcDir, options.modulesDir);
    }

    if (!localModules.length && !npmModules.length) return false;

    info('VueMS init');

    if (options.modules.npm) {
        npmModules = options.modules.npm.map(module => ({
            name: module,
            type: 'npm',
            path: join(options.vendorDir, module, 'src'),
        }));
    }
    if (options.modules.local) {
        localModules = options.modules.local.map((module) => {
            const path = join(options.modulesDir, module, 'src');

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
                path: join(options.modulesDir, module),
            };
        });
    }

    options.allModules = [...localModules, ...npmModules];

    const beforeAllData = await beforeAll.call(this, options);
    const initModulesMessages = await initModules.call(this, beforeAllData.modulesConfigs, options);
    const afterAllMessages = await afterAll.call(this, options);
    const messages = {
        ...beforeAllData.messages,
        ...initModulesMessages,
        ...afterAllMessages,
    };

    if (options.logProcess) {
        log(messages);
    }
}

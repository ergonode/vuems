/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

import { resolve as resolvePath } from 'path';
import deepmerge from 'deepmerge';
import { readFileSync } from 'fs-extra';
import { findPaths, flattenDeep } from '../helpers/tools';
import { log } from '../helpers/log';
import { DIRECTORIES } from '../helpers/constants';

/**
 * Register all routers from modules
 * @async
 * @function registerRouter
 * @param {Object} options - Module options
 * @param {Object} options.allModules - All active modules
 * @returns {Promise<string>}
 */
async function registerRouter({ allModules, directories }) {
    const configDir = directories.config || DIRECTORIES.config;
    const allRoutes = await Promise.all(
        findPaths({
            modules: allModules,
            suffix: configDir,
            regExp: /routes\.js/,
        }),
    );

    await this.addTemplate({
        fileName: 'router.modules.js',
        src: resolvePath(__dirname, '../templates/router.ejs'),
        options: {
            router: flattenDeep(allRoutes),
        },
    });

    return 'Router registered';
}

/**
 * Register all extensions from modules
 * @async
 * @function registerExtends
 * @param {Object} options - Module options
 * @param {Object} options.allModules - All active modules
 * @returns {Promise<string>}
 */
async function registerExtends({ allModules, directories }) {
    const configDir = directories.config || DIRECTORIES.config;
    const allExtends = await Promise.all(
        findPaths({
            modules: allModules,
            suffix: configDir,
            regExp: /extends\.js/,
        }),
    );

    await this.addTemplate({
        fileName: 'extends.modules.js',
        src: resolvePath(__dirname, '../templates/extends.ejs'),
        options: {
            extend: flattenDeep(allExtends.filter((m) => m !== null)),
        },
    });
    await this.addTemplate({
        fileName: 'routerHelper.modules.js',
        src: resolvePath(__dirname, '../templates/routerHelper.ejs'),
    });

    return 'Extends registered';
}

/**
 * Register all middlewares from modules
 * @async
 * @function registerMiddleware
 * @param {Object} options - Module options
 * @param {Object} options.allModules - All active modules
 * @returns {Promise<string>}
 */
async function registerMiddleware({ allModules, directories }) {
    const middlewareDir = directories.middleware || DIRECTORIES.middleware;
    const allMiddleware = await Promise.all(
        findPaths({
            modules: allModules,
            suffix: middlewareDir,
            regExp: /\.global\.js/,
        }),
    );

    await this.addTemplate({
        fileName: 'middleware.modules.js',
        src: resolvePath(__dirname, '../templates/middleware.ejs'),
        options: {
            middleware: flattenDeep(allMiddleware.filter((m) => m !== null)),
        },
    });

    return 'Middleware registered';
}

/**
 * Register all vuex stores from modules
 * @async
 * @function registerStore
 * @param {Object} options - Module options
 * @param {Object} options.allModules - All active modules
 * @returns {Promise<string>}
 */
async function registerStore({ allModules, directories }) {
    const storeDir = directories.store || DIRECTORIES.store;
    const allStore = await Promise.all(
        findPaths({
            modules: allModules,
            suffix: storeDir,
            regExp: /index\.js/,
        }),
    );

    await this.addTemplate({
        fileName: 'store.modules.js',
        src: resolvePath(__dirname, '../templates/store.ejs'),
        options: {
            store: flattenDeep(allStore.filter((m) => m !== null)),
        },
    });

    return 'Store registered';
}

/**
 * Register all i18n translations
 * @async
 * @function registerI18n
 * @param {Object} options - Module options
 * @param {Object} options.allModules - All active modules
 * @returns {string}
 */
async function registerI18n({ allModules, directories, i18n }) {
    const localesDir = directories.locales || DIRECTORIES.locales;

    i18n.forEach(async (lang) => {
        let i18nTmp = {};
        const allTranslations = await Promise.all(
            findPaths({
                modules: allModules,
                suffix: localesDir,
                regExp: new RegExp(`${lang}.json`, 'i'),
            }),
        );

        flattenDeep(allTranslations.filter((m) => m !== null)).forEach((l) => {
            i18nTmp = deepmerge(
                i18nTmp,
                JSON.parse(readFileSync(l.fullname, 'utf8')),
            );
        });

        await this.addTemplate({
            fileName: `locales/${lang}.json`,
            src: resolvePath(__dirname, '../templates/i18n.ejs'),
            options: {
                i18n: i18nTmp,
            },
        });
    });

    return 'I18n registered';
}

/**
 * Register main plugin with extensions
 * @async
 * @function registerPlugins
 * @returns {Promise<string>}
 */
async function registerPlugins({ vuex }) {
    await this.addPlugin({
        fileName: 'plugin.modules.js',
        src: resolvePath(__dirname, '../templates/plugin.ejs'),
    });
    if (vuex) {
        await this.addPlugin({
            fileName: 'pluginVuex.modules.js',
            src: resolvePath(__dirname, '../templates/pluginVuex.ejs'),
        });
    }

    return 'Plugins registered';
}

/**
 * Run actions after all modules are loaded
 * @function afterModules
 * @param {Object} moduleOptions - Module options
 * @param {Object} params - Data needed to load the module
 * @param {Object} params.options - VueMS initial options
 */
export default async function afterModules({ options }) {
    const { verbose } = options;
    const promises = [
        registerRouter.call(this, options),
        registerExtends.call(this, options),
        registerMiddleware.call(this, options),
        registerPlugins.call(this, options),
    ];

    if (options.vuex) promises.push(registerStore.call(this, options));
    if (Array.isArray(options.i18n) && options.i18n.length > 0) {
        promises.push(registerI18n.call(this, options));
    }

    const logs = await Promise.all(promises);

    if (verbose) {
        log({
            header: 'After all modules',
            logs: logs.filter((x) => !!x),
        });
    }
}

/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { resolve as resolvePath } from 'path';
import { findPaths } from '../helpers/tools';
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
    const allRoutes = await Promise.all(findPaths({
        modules: allModules,
        suffix: configDir,
        regExp: /routes\.js/,
    }));

    await this.addTemplate({
        fileName: 'router.modules.js',
        src: resolvePath(__dirname, '../templates/router.ejs'),
        options: {
            router: allRoutes.flat(),
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
    const allExtends = await Promise.all(findPaths({
        modules: allModules,
        suffix: configDir,
        regExp: /extends\.js/,
    }));

    await this.addTemplate({
        fileName: 'extends.modules.js',
        src: resolvePath(__dirname, '../templates/extends.ejs'),
        options: {
            extend: allExtends.filter(m => m !== null).flat(),
        },
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
    const allMiddleware = await Promise.all(findPaths({
        modules: allModules,
        suffix: middlewareDir,
        regExp: /\.global\.js/,
    }));

    await this.addTemplate({
        fileName: 'middleware.modules.js',
        src: resolvePath(__dirname, '../templates/middleware.ejs'),
        options: {
            middleware: allMiddleware.filter(m => m !== null).flat(),
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
    const allStore = await Promise.all(findPaths({
        modules: allModules,
        suffix: storeDir,
        regExp: /index\.js/,
    }));

    await this.addTemplate({
        fileName: 'store.modules.js',
        src: resolvePath(__dirname, '../templates/store.ejs'),
        options: {
            store: allStore.filter(m => m !== null).flat(),
        },
    });

    return 'Store registered';
}

/**
* Register main plugin with extensions
* @async
* @function registerPlugin
* @returns {Promise<string>}
*/
async function registerPlugin() {
    await this.addPlugin({
        fileName: 'plugin.modules.js',
        src: resolvePath(__dirname, '../templates/plugin.ejs'),
    });

    return 'Plugin registered';
}

/**
* Run actions after all modules are loaded
* @function afterAllModule
* @param {Object} moduleOptions - Module options
* @returns {Promise<Object>}
*/
export default async function afterAllModule(moduleOptions) {
    const message = {};

    message.registerRouter = await registerRouter.call(this, moduleOptions);
    message.registerExtends = await registerExtends.call(this, moduleOptions);
    message.registerMiddleware = await registerMiddleware.call(this, moduleOptions);
    message.registerStore = await registerStore.call(this, moduleOptions);
    message.registerPlugin = await registerPlugin.call(this);

    return message;
}

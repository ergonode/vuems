/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import {
    name as NAME,
    description as DESCRIPTION,
} from '../../package';

/**
 * Module name
 * @const {string}
 */
export const MODULE_NAME = NAME;

/**
 * Module description
 * @const {string}
 */
export const MODULE_DESCRIPTION = DESCRIPTION;

/**
 * Default module directories
 * @const {Object}
 */
export const DIRECTORIES = {
    assets: 'assets',
    components: 'components',
    config: 'config',
    layouts: 'layouts',
    locales: 'locales',
    middleware: 'middleware',
    pages: 'pages',
    plugins: 'plugins',
    services: 'services',
    store: 'store',
};

/**
 * Default module options
 * @const {Object}
 */
export const DEFAULTS = {
    modules: { // modules list
        local: [],
        npm: [],
    },
    required: [], // required modules
    modulesDir: 'modules', // local modules directory
    vendorDir: 'vendor', // tmp npm modules directory (symlinks)
    nodeModulesDir: 'node_modules', // directory to find npm modules
    vuex: false, // set 'true' if VUEX is implemented in the project
    i18n: [], // set array with translations language if i18n plugin is implemented in the project
    isDev: false, // is development mode
    logLoadedModules: false, // show debug logs with loaded modules
    verbose: true, // show debug logs
    directories: DIRECTORIES, // directories names
};

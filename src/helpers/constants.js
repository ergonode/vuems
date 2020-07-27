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
    middleware: 'middleware',
    pages: 'pages',
    plugins: 'plugins',
    store: 'store',
};

/**
 * Default module options
 * @const {Object}
 */
export const DEFAULTS = {
    modules: {
        local: [],
        npm: [],
    },
    required: [], // required modules
    modulesDir: 'modules', // local modules directory
    vendorDir: 'vendor', // tmp npm modules directory (symlinks)
    nodeModulesDir: 'node_modules', // directory to find npm modules
    vuex: true, // set 'true' if VUEX is implemented in the project
    isDev: false,
    logLoadedModules: false,
    logProcess: true,
    directories: DIRECTORIES,
};

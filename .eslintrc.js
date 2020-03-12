/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true,
    },
    parser: 'babel-eslint',
    extends: [
        'airbnb-base',
        'plugin:jest/recommended',
    ],
    plugins: [
        'jest',
        'notice',
    ],
    rules: {
        'arrow-parens': ['error', 'as-needed', { requireForBlockBody: true }],
        'import/no-mutable-exports': 'error',
        'import/order': 'error',
        'import/first': 'error',
        'notice/notice': [
            'error', {
                templateFile: './config/.copyright',
                messages: {
                    whenFailedToMatch: "Couldn't find 'License Header', are you sure you added it?",
                },
            },
        ],
        'import/extensions': 'off',
        'no-console': 'off',
        'no-alert': 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'import/no-unresolved': ['off'],
        'import/prefer-default-export': ['off'],
        indent: ['error', 4],
        'no-param-reassign': ['error', {
            props: true,
            ignorePropertyModificationsFor: [
                'state',
            ],
        }],
        'class-methods-use-this': ['off'],
        'global-require': ['off'],
        'import/no-dynamic-require': ['off'],
        'no-underscore-dangle': 'off',
        'no-unused-vars': ['error', { argsIgnorePattern: 'commit' }],
        'max-len': ['error', {
            code: 100,
            ignoreTrailingComments: true,
            ignoreComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
        }],
        'jest/no-commented-out-tests': 'off',
        'jest/expect-expect': 'off',
        'jest/no-mocks-import': 'off',
    },
};

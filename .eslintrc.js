/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

module.exports = {
    env: {
        es6: true,
        node: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        allowImportExportEverywhere: false,
    },
    plugins: ['notice', 'prettier'],
    extends: ['airbnb', 'prettier'],
    rules: {
        'prettier/prettier': [
            'error',
            {
                singleQuote: true,
                tabWidth: 4,
                printWidth: 80,
                semi: true,
                trailingComma: 'all',
            },
            {
                usePrettierrc: false,
            },
        ],
        'notice/notice': [
            'error',
            {
                templateFile: './config/.copyright',
                messages: {
                    whenFailedToMatch:
                        "Couldn't find 'License Header', are you sure you added it?",
                },
            },
        ],
        indent: ['error', 4],
        'no-underscore-dangle': 'off',
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: 'commit',
            },
        ],
        'import/extensions': 'off',
        'import/named': 'off',
        'import/no-named-as-default': 'off',
        'import/no-named-as-default-member': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-unresolved': ['off'],
        'import/prefer-default-export': ['off'],
        'import/order': 'error',
        'import/no-mutable-exports': 'error',
        'import/first': 'error',
        'import/no-duplicates': 'error',
        'import/no-dynamic-require': ['off'],
    },
};

/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */

module.exports = {
    verbose: true,
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
    ],
    snapshotSerializers: [
        'jest-serializer-vue',
    ],
    moduleNameMapper: {
        '^~/(.*)$': '<rootDir>/$1',
    },
    transform: {
        '^.+\\.(js|jsx)?$': 'babel-jest',
        '.+\\.(css|styl|less|sass|scss|png|svg|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    },
    transformIgnorePatterns: [
        'node_modules/',
    ],
    testMatch: [
        '**/(__tests__|tests)/**/*.test.(js|jsx|ts|tsx)',
    ],
    reporters: [
        'default',
        ['jest-junit', { suiteName: 'jest tests', outputDirectory: 'build', outputName: './jest-junit.xml' }],
    ],
};

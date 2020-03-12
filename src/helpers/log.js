/*
 * Copyright © Bold Brand Commerce Sp. z o.o. All rights reserved.
 * See LICENSE for license details.
 */
import { success } from 'consola';

/**
* Show all messages
* @function log
* @param {Object} messages - Messages
*/
export async function log(messages) {
    Object.values(messages).forEach(msg => success(msg));
}

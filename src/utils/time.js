import { parse } from 'date-fns';

/**
 * @constant
 * @function
 * @param {number} timestamp
 * @returns {Date}
 */
export const fromUnixTime = (timestamp) => parse(timestamp * 1000);

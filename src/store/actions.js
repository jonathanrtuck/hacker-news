/**
 * @constant
 * @type {string}
 */
export const PAGE_LOAD = 'PAGE_LOAD';

/**
 * @constant
 * @type {string}
 */
export const ERROR = 'ERROR';
/**
 * @constant
 * @type {string}
 */
export const REQUEST = 'REQUEST';
/**
 * @constant
 * @type {string}
 */
export const SUCCESS = 'SUCCESS';

/**
 * @constant
 * @function
 * @returns {object}
 */
export const loadPage = () => ({
  meta: {
    status: REQUEST,
  },
  type: PAGE_LOAD,
});

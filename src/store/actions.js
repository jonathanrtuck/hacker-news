/**
 * @constant
 * @type {string}
 */
export const ITEM_LOAD = 'ITEM_LOAD';
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
 * @param {number} id
 * @returns {object}
 */
export const loadItem = (id) => ({
  meta: {
    status: REQUEST,
  },
  payload: {
    id,
  },
  type: ITEM_LOAD,
});

/**
 * @constant
 * @function
 * @param {number} index
 * @returns {object}
 */
export const loadPage = (index) => ({
  meta: {
    status: REQUEST,
  },
  payload: {
    index,
  },
  type: PAGE_LOAD,
});

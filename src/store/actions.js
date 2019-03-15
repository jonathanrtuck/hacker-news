/**
 * @constant
 * @type {string}
 */
export const POST_READ = 'POST_READ';
/**
 * @constant
 * @type {string}
 */
export const POSTS_READ = 'POSTS_READ';

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
export const readPost = (id) => ({
  meta: {
    status: REQUEST,
  },
  payload: {
    id,
  },
  type: POST_READ,
});

/**
 * @constant
 * @function
 * @param {number} index
 * @returns {object}
 */
export const readPosts = (index) => ({
  meta: {
    status: REQUEST,
  },
  payload: {
    index,
  },
  type: POSTS_READ,
});

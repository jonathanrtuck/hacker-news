/**
 * @constant
 * @type {string}
 */
export const STORIES_READ = 'STORIES_READ';
/**
 * @constant
 * @type {string}
 */
export const STORY_READ = 'STORY_READ';

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
 * @param {number} index
 * @returns {object}
 */
export const readStories = (index) => ({
  meta: {
    status: REQUEST,
  },
  payload: {
    index,
  },
  type: STORIES_READ,
});

/**
 * @constant
 * @function
 * @param {number} id
 * @returns {object}
 */
export const readStory = (id) => ({
  meta: {
    status: REQUEST,
  },
  payload: {
    id,
  },
  type: STORY_READ,
});

import { REQUEST, STORIES_READ, STORY_READ, SUCCESS } from 'store/actions';
import { filter, find, get, matchesProperty } from 'lodash-es';

/**
 * @constant
 * @type {object}
 */
export const initialState = {
  busy: false,
  count: 0,
  items: [],
  perPage: 10,
};

/**
 * @function
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (get(action, 'type')) {
    case STORIES_READ:
      switch (get(action, 'meta.status')) {
        case REQUEST:
          return {
            ...state,
            busy: true,
            count: 0,
            items: [],
          };

        case SUCCESS:
          return {
            ...state,
            busy: false,
            count: get(action, 'payload.count'),
            items: get(action, 'payload.items'),
          };

        default:
          return state;
      }

    case STORY_READ:
      switch (get(action, 'meta.status')) {
        case REQUEST:
          return {
            ...state,
            busy: true,
            items: [],
          };

        case SUCCESS:
          return {
            ...state,
            busy: false,
            items: get(action, 'payload.items'),
          };

        default:
          return state;
      }

    default:
      return state;
  }
};

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {string}
 */
export const getBy = (state, id) =>
  get(find(get(state, 'items'), matchesProperty('id', id)), 'by');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {object[]}
 */
export const getKids = (state, id) =>
  get(find(get(state, 'items'), matchesProperty('id', id)), 'kids');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {boolean}
 */
export const getNumPages = (state) =>
  Math.ceil(get(state, 'count') / get(state, 'perPage'));

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {object[]}
 */
export const getPerPage = (state) => get(state, 'perPage');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {number}
 */
export const getScore = (state, id) =>
  get(find(get(state, 'items'), matchesProperty('id', id)), 'score');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {object[]}
 */
export const getStories = (state) =>
  filter(get(state, 'items'), matchesProperty('type', 'story'));

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {number}
 */
export const getText = (state, id) =>
  get(find(get(state, 'items'), matchesProperty('id', id)), 'text');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {number}
 */
export const getTime = (state, id) =>
  get(find(get(state, 'items'), matchesProperty('id', id)), 'time');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {string}
 */
export const getTitle = (state, id) =>
  get(find(get(state, 'items'), matchesProperty('id', id)), 'title');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {string}
 */
export const getUrl = (state, id) =>
  get(find(get(state, 'items'), matchesProperty('id', id)), 'url');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {boolean}
 */
export const isBusy = (state) => get(state, 'busy');

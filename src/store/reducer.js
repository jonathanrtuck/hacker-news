import { POST_READ, POSTS_READ, REQUEST, SUCCESS } from 'store/actions';
import { filter, find, get, matchesProperty } from 'lodash-es';

/**
 * @constant
 * @type {object}
 */
export const initialState = {
  busy: false,
  count: 0,
  items: [],
  perPage: 20,
};

/**
 * @function
 * @param {object} state
 * @param {object} action
 * @returns {object}
 */
export default (state = initialState, action) => {
  switch (get(action, 'type')) {
    case POST_READ:
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

    case POSTS_READ:
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

    default:
      return state;
  }
};

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {?object}
 */
const getItem = (state, id) =>
  find(get(state, 'items'), matchesProperty('id', id));

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {?string}
 */
export const getBy = (state, id) => get(getItem(state, id), 'by');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {?boolean}
 */
export const getDeleted = (state, id) => get(getItem(state, id), 'deleted');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {?object[]}
 */
export const getKids = (state, id) => get(getItem(state, id), 'kids');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {number}
 */
export const getNumPages = (state) =>
  Math.ceil(get(state, 'count') / get(state, 'perPage'));

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {number}
 */
export const getPerPage = (state) => get(state, 'perPage');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {object[]}
 */
export const getPosts = (state) =>
  filter(get(state, 'items'), (obj) => {
    switch (get(obj, 'type')) {
      case 'job':
      case 'poll':
      case 'story':
        return true;

      default:
        return false;
    }
  });

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {number}
 */
export const getScore = (state, id) => get(getItem(state, id), 'score');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {number}
 */
export const getText = (state, id) => get(getItem(state, id), 'text');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {number}
 */
export const getTime = (state, id) => get(getItem(state, id), 'time');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {string}
 */
export const getTitle = (state, id) => get(getItem(state, id), 'title');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {string}
 */
export const getUrl = (state, id) => get(getItem(state, id), 'url');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {boolean}
 */
export const isBusy = (state) => get(state, 'busy');

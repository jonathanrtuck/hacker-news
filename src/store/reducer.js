import { ERROR, ITEM_LOAD, PAGE_LOAD, REQUEST, SUCCESS } from 'store/actions';
import { find, get } from 'lodash-es';

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
    case ITEM_LOAD:
      switch (get(action, 'meta.status')) {
        case ERROR:
          return {
            ...state,
            busy: false,
          };

        case REQUEST:
          return {
            ...state,
            busy: true,
            items: state.items.map((obj) => ({
              ...obj,
              active: obj.id === get(action, 'payload.id'),
            })),
          };

        case SUCCESS:
          return {
            ...state,
            busy: false,
          };

        default:
          return state;
      }

    case PAGE_LOAD:
      switch (get(action, 'meta.status')) {
        case ERROR:
          return {
            ...state,
            busy: false,
          };

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
 * @returns {?object}
 */
export const getActiveItem = (state) => find(get(state, 'items'), 'active');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {object[]}
 */
export const getItems = (state) => get(state, 'items');

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
 * @returns {?string}
 */
export const getTitle = (state) => get(getActiveItem(state), 'title');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {boolean}
 */
export const isBusy = (state) => get(state, 'busy');

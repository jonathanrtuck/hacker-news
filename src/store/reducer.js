import { ERROR, ITEM_LOAD, PAGE_LOAD, REQUEST, SUCCESS } from 'store/actions';
import { get } from 'lodash-es';

/**
 * @constant
 * @type {object}
 */
export const initialState = {
  busy: false,
  count: 0,
  items: [],
  page: 0,
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
            page: get(action, 'payload.index'),
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
 * @returns {object[]}
 */
export const getItems = (state) => get(state, 'items');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {object[]}
 */
export const getPage = (state) => get(state, 'page');

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
 * @returns {boolean}
 */
export const isBusy = (state) => get(state, 'busy');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {boolean}
 */
export const isFirstPage = (state) => get(state, 'page') === 0;

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {boolean}
 */
export const isLastPage = (state) =>
  (get(state, 'page') + 1) * get(state, 'perPage') > get(state, 'count');

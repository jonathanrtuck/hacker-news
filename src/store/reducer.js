import { ERROR, PAGE_LOAD, REQUEST, SUCCESS } from 'store/actions';
import { get } from 'lodash-es';

/**
 * @constant
 * @type {object}
 */
export const initialState = {
  busy: false,
  items: [],
  page: 0,
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
 * @returns {object[]}
 */
export const getItems = (state) => get(state, 'items');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {boolean}
 */
export const isBusy = (state) => get(state, 'busy');

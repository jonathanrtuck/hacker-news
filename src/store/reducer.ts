import { Action, ActionType, Status } from 'store/actions';
import { Location } from 'history';

export interface Item {
  createdAt: Date;
  createdBy: string;
  id: number;
  score: number;
  title: string;
}

export interface State {
  count: number;
  isBusy: boolean;
  items: Item[];
  location: Location;
  perPage: number;
}

export const initialState: State = {
  count: 0,
  isBusy: false,
  items: [],
  location: undefined,
  perPage: 20,
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.ReadPost:
      switch (action.meta.status) {
        case Status.Request:
          return {
            ...state,
            isBusy: true,
            items: [],
          };

        case Status.Success:
          return {
            ...state,
            isBusy: false,
            items: action.payload.items,
          };

        default:
          return state;
      }

    case ActionType.ReadPosts:
      switch (action.meta.status) {
        case Status.Request:
          return {
            ...state,
            count: 0,
            isBusy: true,
            items: [],
          };

        case Status.Success:
          return {
            ...state,
            count: action.payload.count,
            isBusy: false,
            items: action.payload.items,
          };

        default:
          return state;
      }

    case ActionType.UpdateLocation:
      return {
        ...state,
        location: action.payload.location,
      };

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
 *
const getItem = (state, id) =>
  find(get(state, 'items'), matchesProperty('id', id));

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {?string}
 *
export const getBy = (state, id) => get(getItem(state, id), 'by');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {?boolean}
 *
export const getDeleted = (state, id) => get(getItem(state, id), 'deleted');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {?object[]}
 *
export const getKids = (state, id) => get(getItem(state, id), 'kids');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {number}
 *
export const getNumPages = (state) =>
  Math.ceil(get(state, 'count') / get(state, 'perPage'));

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {number}
 *
export const getPerPage = (state) => get(state, 'perPage');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {object[]}
 *
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
 *
export const getScore = (state, id) => get(getItem(state, id), 'score');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {number}
 *
export const getText = (state, id) => get(getItem(state, id), 'text');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {number}
 *
export const getTime = (state, id) => get(getItem(state, id), 'time');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {string}
 *
export const getTitle = (state, id) => get(getItem(state, id), 'title');

/**
 * @constant
 * @function
 * @param {object} state
 * @param {number} id
 * @returns {string}
 *
export const getUrl = (state, id) => get(getItem(state, id), 'url');

/**
 * @constant
 * @function
 * @param {object} state
 * @returns {boolean}
 *
export const isBusy = (state) => get(state, 'busy');
*/
import axios from 'axios';
import { flatMap, filter, map } from 'rxjs/operators';
import { get, matchesProperty, property } from 'lodash-es';
import { getItems } from 'store/reducer';
import { ofType } from 'redux-observable';
import { ITEM_LOAD, REQUEST, SUCCESS } from 'store/actions';

/**
 * @constant
 * @see https://github.com/HackerNews/API
 * @see https://cors-anywhere.herokuapp.com/
 * @type {string}
 */
const url =
  'https://cors-anywhere.herokuapp.com/https://hacker-news.firebaseio.com/v0';

/**
 * @constant
 * @function
 * @param {object} obj
 * @param {number[]} obj.kids
 * @returns {Promise}
 */
const getItem = ({ kids }) =>
  axios.all(
    kids.map((id) =>
      axios({
        method: 'get',
        url: `${url}/item/${id}.json`,
      }).then(property('data'))
    )
  );

/**
 * @function
 * @param {Observable} action$
 * @returns {Observable}
 */
export default (action$, state$) =>
  action$.pipe(
    ofType(ITEM_LOAD),
    filter((action) => get(action, 'meta.status') === REQUEST),
    flatMap((action) => {
      /**
       * @constant
       * @type {object}
       */
      const state = state$.value;
      /**
       * @constant
       * @type {object}
       */
      const items = getItems(state);

      return getItem(
        items.find(matchesProperty('id', get(action, 'payload.id')))
      );
    }),
    map((payload) => ({
      meta: {
        status: SUCCESS,
      },
      payload,
      type: ITEM_LOAD,
    }))
  );

import axios from 'axios';
import { get, property } from 'lodash-es';
import { flatMap, filter, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { ITEM_LOAD, REQUEST, SUCCESS } from 'store/actions';

/**
 * @constant
 * @see https://github.com/HackerNews/API
 * @see https://cors-anywhere.herokuapp.com/
 * @type {string}
 */
const baseUrl =
  'https://cors-anywhere.herokuapp.com/https://hacker-news.firebaseio.com/v0';

/**
 * @constant
 * @function
 * @param {object} obj
 * @param {number} obj.first
 * @param {number} obj.offset
 * @returns {Promise}
 */
const getItem = ({ id }) =>
  axios({
    method: 'get',
    url: `${baseUrl}/item/${id}.json`,
  })
    .then(property('data'))
    .then((item) => ({
      item,
    }));

/**
 * @constant
 * @function
 * @param {Observable}
 * @returns {Observable}
 */
export default (action$) =>
  action$.pipe(
    ofType(ITEM_LOAD),
    filter((action) => get(action, 'meta.status') === REQUEST),
    flatMap((action) =>
      getItem({
        id: get(action, 'payload.id'),
      })
    ),
    map((payload) => ({
      meta: {
        status: SUCCESS,
      },
      payload,
      type: ITEM_LOAD,
    }))
  );

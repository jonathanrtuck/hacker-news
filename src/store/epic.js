import { PAGE_LOAD, REQUEST, SUCCESS } from 'store/actions';
import axios from 'axios';
import { drop, get, property, take } from 'lodash-es';
import { flatMap, filter, map, tap } from 'rxjs/operators';
import { ofType } from 'redux-observable';

/**
 * @constant
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
const getItems = ({ first, offset }) =>
  axios({
    method: 'get',
    url: `${baseUrl}/topstories.json`,
  })
    .then(property('data'))
    .then((ids) => take(drop(ids, offset), first))
    .then((ids) =>
      ids.map((id) =>
        axios({
          method: 'get',
          url: `${baseUrl}/item/${id}.json`,
        })
      )
    )
    .then(axios.all)
    .then((responses) => responses.map(property('data')));

/**
 * @constant
 * @function
 * @param {Observable}
 * @returns {Observable}
 * @see https://github.com/HackerNews/API
 * @see https://cors-anywhere.herokuapp.com/
 */
export default (action$, state$) =>
  action$.pipe(
    tap(console.debug),

    ofType(PAGE_LOAD),
    filter((action) => get(action, 'meta.status') === REQUEST),
    flatMap(() =>
      getItems({
        first: get(state$, 'value.perPage'),
        offset: get(state$, 'value.perPage') * get(state$, 'value.page'),
      })
    ),
    map((arr) => ({
      meta: {
        status: SUCCESS,
      },
      payload: {
        items: arr,
      },
      type: PAGE_LOAD,
    }))
  );

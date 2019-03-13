import axios from 'axios';
import { drop, get, property, take } from 'lodash-es';
import { flatMap, filter, map } from 'rxjs/operators';
import { getPage, getPerPage } from 'store/reducer';
import { ofType } from 'redux-observable';
import { PAGE_LOAD, REQUEST, SUCCESS } from 'store/actions';

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
 * @param {number} obj.first
 * @param {number} obj.offset
 * @returns {Promise}
 */
const getItems = ({ first, offset }) => {
  let count;

  return axios({
    method: 'get',
    url: `${url}/topstories.json`,
  })
    .then(property('data'))
    .then((ids) => {
      count = ids.length;

      return take(drop(ids, offset), first);
    })
    .then((ids) =>
      ids.map((id) =>
        axios({
          method: 'get',
          url: `${url}/item/${id}.json`,
        })
      )
    )
    .then(axios.all)
    .then((responses) => ({
      count,
      items: responses.map(property('data')),
    }));
};

/**
 * @function
 * @param {Observable} action$
 * @param {Observable} state$
 * @returns {Observable}
 */
export default (action$, state$) =>
  action$.pipe(
    ofType(PAGE_LOAD),
    filter((action) => get(action, 'meta.status') === REQUEST),
    flatMap(() => {
      /**
       * @constant
       * @type {object}
       */
      const state = state$.value;
      /**
       * @constant
       * @type {number}
       */
      const page = getPage(state);
      /**
       * @constant
       * @type {number}
       */
      const perPage = getPerPage(state);

      return getItems({
        first: perPage,
        offset: page * perPage,
      });
    }),
    map((payload) => ({
      meta: {
        status: SUCCESS,
      },
      payload,
      type: PAGE_LOAD,
    }))
  );

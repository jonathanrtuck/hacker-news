import axios from 'axios';
import { drop, get, property, take } from 'lodash-es';
import { flatMap, filter, map } from 'rxjs/operators';
import { getPerPage } from 'store/reducer';
import { ofType } from 'redux-observable';
import { REQUEST, STORIES_READ, SUCCESS } from 'store/actions';

/**
 * @constant
 * @see https://github.com/HackerNews/API
 * @type {string}
 */
const url = 'https://hacker-news.firebaseio.com/v0';

/**
 * @constant
 * @function
 * @param {object} obj
 * @param {number} obj.first
 * @param {number} obj.offset
 * @returns {Promise}
 */
const getStories = ({ first, offset }) => {
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
    ofType(STORIES_READ),
    filter((action) => get(action, 'meta.status') === REQUEST),
    flatMap((action) => {
      /**
       * @constant
       * @type {number}
       */
      const page = get(action, 'payload.index');
      /**
       * @constant
       * @type {number}
       */
      const perPage = getPerPage(state$.value);

      return getStories({
        first: perPage,
        offset: page * perPage,
      });
    }),
    map((payload) => ({
      meta: {
        status: SUCCESS,
      },
      payload,
      type: STORIES_READ,
    }))
  );

import axios from 'axios';
import { flatMap, filter, map } from 'rxjs/operators';
import { get, property } from 'lodash-es';
import { ofType } from 'redux-observable';
import { REQUEST, STORY_READ, SUCCESS } from 'store/actions';

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
 * @param {number[]} obj.kids
 * @returns {Promise}
 */
/*
const getComments = ({ kids }) =>
  axios.all(
    kids.map((id) =>
      axios({
        method: 'get',
        url: `${url}/item/${id}.json`,
      }).then(property('data'))
    )
  );
*/

/**
 * @constant
 * @function
 * @param {object} obj
 * @param {number} obj.first
 * @param {number} obj.offset
 * @returns {Promise}
 */
const getStory = ({ id }) =>
  axios({
    method: 'get',
    url: `${url}/item/${id}.json`,
  })
    .then(property('data'))
    .then((items) => ({
      items: [items],
    }));

/**
 * @function
 * @param {Observable} action$
 * @returns {Observable}
 */
export default (action$) =>
  action$.pipe(
    ofType(STORY_READ),
    filter((action) => get(action, 'meta.status') === REQUEST),
    flatMap((action) =>
      getStory({
        id: get(action, 'payload.id'),
      })
    ),
    map((payload) => ({
      meta: {
        status: SUCCESS,
      },
      payload,
      type: STORY_READ,
    }))
  );

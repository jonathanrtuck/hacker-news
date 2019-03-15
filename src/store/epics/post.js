import axios from 'axios';
import { flatMap, filter, map } from 'rxjs/operators';
import { flattenDeep, get, isArray, isEmpty, property } from 'lodash-es';
import { ofType } from 'redux-observable';
import { POST_READ, REQUEST, SUCCESS } from 'store/actions';

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
 * @param {?number[]} obj.kids
 * @recursive
 * @returns {object|Promise}
 */
const getKids = (obj) => {
  /**
   * @constant
   * @type {?number[]}
   */
  const kids = get(obj, 'kids');

  if (isArray(kids) && !isEmpty(kids)) {
    return axios
      .all(
        kids.map((id) =>
          axios({
            method: 'get',
            url: `${url}/item/${id}.json`,
          })
            .then(property('data'))
            .then(getKids)
        )
      )
      .then((arr) => [obj].concat(arr));
  }

  return [obj];
};

/**
 * @constant
 * @function
 * @param {object} obj
 * @param {number} obj.first
 * @param {number} obj.offset
 * @returns {Promise}
 */
const getPost = ({ id }) =>
  axios({
    method: 'get',
    url: `${url}/item/${id}.json`,
  })
    .then(property('data'))
    .then(getKids)
    .then(flattenDeep);

/**
 * @function
 * @param {Observable} action$
 * @returns {Observable}
 */
export default (action$) =>
  action$.pipe(
    ofType(POST_READ),
    filter((action) => get(action, 'meta.status') === REQUEST),
    flatMap((action) =>
      getPost({
        id: get(action, 'payload.id'),
      }).then((items) => ({
        items,
      }))
    ),
    map((payload) => ({
      meta: {
        status: SUCCESS,
      },
      payload,
      type: POST_READ,
    }))
  );

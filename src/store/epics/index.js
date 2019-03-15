import { combineEpics } from 'redux-observable';
import post from './post';
import posts from './posts';

/**
 * @type {function}
 */
export default combineEpics(post, posts);

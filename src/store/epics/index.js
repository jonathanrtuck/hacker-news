import { combineEpics } from 'redux-observable';
import stories from './stories';
import story from './story';

/**
 * @type {function}
 */
export default combineEpics(stories, story);

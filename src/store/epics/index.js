import { combineEpics } from 'redux-observable';
import debug from './debug';
import stories from './stories';
import story from './story';

/**
 * @type {function}
 */
export default combineEpics(debug, stories, story);

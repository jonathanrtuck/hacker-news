import { combineEpics } from 'redux-observable';
import debug from './debug';
import getItem from './getItem';
import getItems from './getItems';

/**
 * @type {function}
 */
export default combineEpics(debug, getItem, getItems);

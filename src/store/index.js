import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import epics from 'store/epics';
import reducer from 'store/reducer';

/**
 * @constant
 * @function
 */
const middleware = createEpicMiddleware();

/**
 * @type {object}
 */
export default createStore(reducer, applyMiddleware(middleware));

middleware.run(epics);

import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import epics from 'store/epics';
import reducer from 'store/reducer';

/**
 * @constant
 * @type {MiddlewareAPI}
 */
const middleware = createEpicMiddleware();

/**
 * @type {object}
 */
const store = createStore(reducer, applyMiddleware(middleware));

middleware.run(epics);

export default store;

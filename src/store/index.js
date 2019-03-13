import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import epic from 'store/epic';
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

middleware.run(epic);

export default store;

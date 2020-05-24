import { Action, ExtraArgument } from 'store/actions';
import { applyMiddleware, createStore, StoreEnhancer } from 'redux';
import reducer from 'store/reducer';
import { State } from 'store/reducer';
import thunk, { ThunkDispatch } from 'redux-thunk';

/**
 * @see https://github.com/HackerNews/API
 */
const API_URL = 'https://hacker-news.firebaseio.com/v0';

const middleware: StoreEnhancer<{
  dispatch: ThunkDispatch<State, ExtraArgument, Action>;
}> = applyMiddleware<ThunkDispatch<State, ExtraArgument, Action>, State>(
  thunk.withExtraArgument({
    api: API_URL,
  })
);

export { State } from 'store/reducer';

export default createStore(reducer, middleware);

import { applyMiddleware, createStore, StoreEnhancer } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'store/actions';
import { ExtraArgument } from 'store/extra-argument';
import reducer from 'store/reducer';
import { State } from 'store/state';

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

export default createStore(reducer, middleware);

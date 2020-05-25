import { applyMiddleware, createStore, StoreEnhancer } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'store/actions';
import reducer from 'store/reducer';
import { State } from 'store/state';

const middleware: StoreEnhancer<{
  dispatch: ThunkDispatch<State, undefined, Action>;
}> = applyMiddleware<ThunkDispatch<State, undefined, Action>, State>(thunk);

export default createStore(reducer, middleware);

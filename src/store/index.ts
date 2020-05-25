import { applyMiddleware, createStore, StoreEnhancer } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'store/actions';
import EXTRA_ARGUMENT from 'store/extra-argument';
import reducer from 'store/reducer';
import { State } from 'store/state';

const middleware: StoreEnhancer<{
  dispatch: ThunkDispatch<State, typeof EXTRA_ARGUMENT, Action>;
}> = applyMiddleware<
  ThunkDispatch<State, typeof EXTRA_ARGUMENT, Action>,
  State
>(thunk.withExtraArgument(EXTRA_ARGUMENT));

export default createStore(reducer, middleware);

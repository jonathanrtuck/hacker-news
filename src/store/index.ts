import { applyMiddleware, createStore, StoreEnhancer } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { Action } from 'store/actions';
import extraArgument, { ExtraArgument } from 'store/extra-argument';
import reducer from 'store/reducer';
import { State } from 'store/state';

const middleware: StoreEnhancer<{
  dispatch: ThunkDispatch<State, ExtraArgument, Action>;
}> = applyMiddleware<ThunkDispatch<State, ExtraArgument, Action>, State>(
  thunk.withExtraArgument(extraArgument)
);

export default createStore(reducer, middleware);

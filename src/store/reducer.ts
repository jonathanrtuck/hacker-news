import { Action, ActionType } from 'store/actions';
import { INITIAL_STATE, State } from 'store/state';

export default (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case ActionType.UpdateState:
      return action.payload;

    default:
      return state;
  }
};

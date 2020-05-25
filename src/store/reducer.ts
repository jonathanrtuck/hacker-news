import { Action, ActionType, Status } from 'store/actions';
import { INITIAL_STATE, State } from 'store/state';

export default (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case ActionType.ReadPost:
      switch (action.meta.status) {
        case Status.Error:
          return {
            ...state,
            isBusy: false,
            isError: true,
          };

        case Status.Request:
          return {
            ...state,
            isBusy: true,
            isError: false,
            view: action.meta.id,
          };

        case Status.Success:
          return {
            ...state,
            ...action.payload,
            isBusy: false,
          };

        default:
          return state;
      }

    case ActionType.ReadPosts:
      switch (action.meta.status) {
        case Status.Error:
          return {
            ...state,
            isBusy: false,
            isError: true,
          };

        case Status.Request:
          return {
            ...state,
            isBusy: true,
            isError: false,
            view: [],
          };

        case Status.Success:
          return {
            ...state,
            ...action.payload,
            isBusy: false,
            view: action.payload.posts.items.map(({ id }) => id),
          };

        default:
          return state;
      }

    case ActionType.UpdateView:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};

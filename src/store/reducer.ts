import { Action, ActionType, Status } from 'store/actions';
import { INITIAL_STATE, State } from 'store/state';

export default (state: State = INITIAL_STATE, action: Action): State => {
  switch (action.type) {
    case ActionType.ReadPost:
      switch (action.meta.status) {
        case Status.Request:
          return {
            ...state,
            isBusy: true,
            posts: [],
          };

        case Status.Success:
          return {
            ...state,
            isBusy: false,
            posts: action.payload.posts,
          };

        default:
          return state;
      }

    case ActionType.ReadPosts:
      switch (action.meta.status) {
        case Status.Request:
          return {
            ...state,
            count: 0,
            isBusy: true,
            posts: [],
          };

        case Status.Success:
          return {
            ...state,
            count: action.payload.count,
            isBusy: false,
            posts: action.payload.posts,
          };

        default:
          return state;
      }

    case ActionType.UpdateLocation:
      return {
        ...state,
        location: action.payload.location,
      };

    default:
      return state;
  }
};

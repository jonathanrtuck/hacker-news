import axios from 'axios';
import { Location } from 'history';
import { Action as ReduxAction } from 'redux';
import { Item, State } from 'store/reducer';
import {
  ThunkAction as ReduxThunkAction,
  ThunkDispatch as ReduxThunkDispatch,
} from 'redux-thunk';

export interface ExtraArgument {
  api: string;
}

export enum ActionType {
  ReadPost = 'READ_POST',
  ReadPosts = 'READ_POSTS',
  UpdateLocation = 'UPDATE_LOCATION',
}

export enum Status {
  Error = 'ERROR',
  Request = 'REQUEST',
  Success = 'SUCCESS',
}

export interface Meta {
  status: Status;
}

export interface PostReadAction extends ReduxAction<ActionType> {
  meta: Meta;
  payload: {
    id: number;
    items?: Item[];
  };
  type: ActionType.ReadPost;
}

export interface PostsReadAction extends ReduxAction<ActionType> {
  meta: Meta;
  payload?: {
    count?: number;
    items?: Item[];
  };
  type: ActionType.ReadPosts;
}

export interface UrlUpdateAction extends ReduxAction<ActionType> {
  payload: {
    location: Location;
  };
  type: ActionType.UpdateLocation;
}

export type Action = PostReadAction | PostsReadAction | UrlUpdateAction;

export type ThunkAction = ReduxThunkAction<void, State, ExtraArgument, Action>;
export type ThunkDispatch = ReduxThunkDispatch<State, ExtraArgument, Action>;

export const readPost = (id: number): PostReadAction => ({
  meta: {
    status: Status.Request,
  },
  payload: {
    id,
  },
  type: ActionType.ReadPost,
});

export const readPosts = (page: number): ThunkAction => (
  dispatch: ThunkDispatch,
  _: unknown,
  { api }: ExtraArgument
): void => {
  console.debug(api);
  dispatch({
    meta: {
      status: Status.Request,
    },
    type: ActionType.ReadPosts,
  });

  axios({
    method: 'get',
    url: `${api}/topstories.json`,
  }).then((a) => {
    console.debug(a);
  });
};

export const updateLocation = (location: Location): ThunkAction => (
  dispatch: ThunkDispatch
): void => {
  dispatch({
    payload: {
      location,
    },
    type: ActionType.UpdateLocation,
  });
};

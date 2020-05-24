import { Location } from 'history';
import { Action as ReduxAction } from 'redux';

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
    items?: unknown[];
  };
  type: ActionType.ReadPost;
}

export interface PostsReadAction extends ReduxAction<ActionType> {
  meta: Meta;
  payload: {
    count?: number;
    index: number;
    items?: unknown[];
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

export const readPost = (id: number): PostReadAction => ({
  meta: {
    status: Status.Request,
  },
  payload: {
    id,
  },
  type: ActionType.ReadPost,
});

export const readPosts = (index: number): PostsReadAction => ({
  meta: {
    status: Status.Request,
  },
  payload: {
    index,
  },
  type: ActionType.ReadPosts,
});

export const updateLocation = (location: Location): UrlUpdateAction => ({
  payload: {
    location,
  },
  type: ActionType.UpdateLocation,
});

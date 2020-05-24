import { Action as ReduxAction } from 'redux';

export enum ActionType {
  PostRead = 'POST_READ',
  PostsRead = 'POSTS_READ',
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
  type: ActionType.PostRead;
}

export interface PostsReadAction extends ReduxAction<ActionType> {
  meta: Meta;
  payload: {
    count?: number;
    index: number;
    items?: unknown[];
  };
  type: ActionType.PostsRead;
}

export type Action = PostReadAction | PostsReadAction;

export const readPost = (id: number): PostReadAction => ({
  meta: {
    status: Status.Request,
  },
  payload: {
    id,
  },
  type: ActionType.PostRead,
});

export const readPosts = (index: number): PostsReadAction => ({
  meta: {
    status: Status.Request,
  },
  payload: {
    index,
  },
  type: ActionType.PostsRead,
});

import axios, { AxiosPromise } from 'axios';
import { fromUnixTime } from 'date-fns';
import { Location } from 'history';
import { drop, property, take } from 'lodash-es';
import { Action as ReduxAction } from 'redux';
import {
  ThunkAction as ReduxThunkAction,
  ThunkDispatch as ReduxThunkDispatch,
} from 'redux-thunk';
import { ExtraArgument } from 'store/extra-argument';
import { Post, State } from 'store/state';

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
    posts?: Post[];
  };
  type: ActionType.ReadPost;
}

export interface PostsReadAction extends ReduxAction<ActionType> {
  meta: Meta;
  payload?: {
    count?: number;
    page?: number;
    posts?: Post[];
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
  getState: () => State,
  { api }: ExtraArgument
): void => {
  const { perPage } = getState();
  let count: number;

  dispatch({
    meta: {
      status: Status.Request,
    },
    payload: {
      page,
    },
    type: ActionType.ReadPosts,
  });

  axios({
    method: 'get',
    url: `${api}/topstories.json`,
  })
    .then(property<unknown, number[]>('data'))
    .then((ids: number[]) => {
      count = ids.length;

      return take(drop(ids, page * perPage), perPage);
    })
    .then((ids: number[]) =>
      ids.map(
        (id): AxiosPromise<unknown> =>
          axios({
            method: 'get',
            url: `${api}/item/${id}.json`,
          })
      )
    )
    .then(axios.all)
    .then((responses: unknown[]): void => {
      const posts: Post[] = responses
        .map(property('data'))
        .map(({ by, id, score, time, title }) => ({
          createdAt: fromUnixTime(time),
          createdBy: by,
          id,
          score,
          title,
        }));

      dispatch({
        meta: {
          status: Status.Success,
        },
        payload: {
          count,
          posts,
        },
        type: ActionType.ReadPosts,
      });
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

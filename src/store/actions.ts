import axios, { AxiosResponse } from 'axios';
import { fromUnixTime } from 'date-fns';
import { Location } from 'history';
import { Action as ReduxAction } from 'redux';
import {
  ThunkAction as ReduxThunkAction,
  ThunkDispatch as ReduxThunkDispatch,
} from 'redux-thunk';
import { ExtraArgument } from 'store/extra-argument';
import { Comment, Post, State } from 'store/state';

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
  payload?: {
    id?: number;
    post?: Post;
  };
  type: ActionType.ReadPost;
}

export interface PostsReadAction extends ReduxAction<ActionType> {
  meta: Meta;
  payload?: {
    count?: number;
    page?: number;
    posts?: Partial<Post>[];
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

export const readPost = (id: number): ThunkAction => async (
  dispatch: ThunkDispatch,
  getState: () => State,
  { api }: ExtraArgument
): Promise<void> => {
  // recursive
  const getComments = async (ids: number[]): Promise<Comment[]> => {
    if (Array.isArray(ids) && ids.length !== 0) {
      const responses: AxiosResponse[] = await axios.all(
        ids.map((id) =>
          axios({
            method: 'get',
            url: `${api}/item/${id}.json`,
          })
        )
      );
      const comments: Comment[] = await Promise.all(
        responses
          .map(({ data }) => data)
          .map(async ({ by, deleted, id, kids, text, time }) => {
            const comments: Comment[] = await getComments(kids);

            return {
              comments,
              content: text,
              createdAt: fromUnixTime(time),
              createdBy: by,
              id,
              isDeleted: deleted,
            };
          })
      );

      return comments;
    }

    return [];
  };

  dispatch({
    meta: {
      status: Status.Request,
    },
    payload: {
      id,
    },
    type: ActionType.ReadPost,
  });

  try {
    const {
      data: { by, kids, score, time, title, url },
    } = await axios({
      method: 'get',
      url: `${api}/item/${id}.json`,
    });
    const comments: Comment[] = await getComments(kids);

    dispatch({
      meta: {
        status: Status.Success,
      },
      payload: {
        post: {
          comments,
          createdAt: fromUnixTime(time),
          createdBy: by,
          id,
          score,
          title,
          url,
        },
      },
      type: ActionType.ReadPost,
    });
  } catch {
    dispatch({
      meta: {
        status: Status.Error,
      },
      type: ActionType.ReadPost,
    });
  }
};

export const readPosts = (page: number): ThunkAction => async (
  dispatch: ThunkDispatch,
  getState: () => State,
  { api }: ExtraArgument
): Promise<void> => {
  const { perPage } = getState();
  const offset: number = (page - 1) * perPage;

  dispatch({
    meta: {
      status: Status.Request,
    },
    payload: {
      page,
    },
    type: ActionType.ReadPosts,
  });

  try {
    const { data } = await axios({
      method: 'get',
      url: `${api}/topstories.json`,
    });
    const count: number = data.length;
    const ids: number[] = data.slice(offset, offset + perPage);
    const responses: AxiosResponse[] = await axios.all(
      ids.map((id) =>
        axios({
          method: 'get',
          url: `${api}/item/${id}.json`,
        })
      )
    );
    const posts: Partial<Post>[] = responses
      .map(({ data }) => data)
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
  } catch {
    dispatch({
      meta: {
        status: Status.Error,
      },
      type: ActionType.ReadPosts,
    });
  }
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

import axios, { AxiosResponse } from 'axios';
import { fromUnixTime } from 'date-fns';
import { match } from 'path-to-regexp';
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
  meta: Meta & {
    id: number;
  };
  payload?: Pick<State, 'posts'>;
  type: ActionType.ReadPost;
}

export interface PostsReadAction extends ReduxAction<ActionType> {
  meta: Meta & {
    index: number;
  };
  payload?: Pick<State, 'posts'>;
  type: ActionType.ReadPosts;
}

export interface UrlUpdateAction extends ReduxAction<ActionType> {
  payload?: Pick<State, 'page' | 'view'>;
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
      id,
      status: Status.Request,
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
        id,
        status: Status.Success,
      },
      payload: {
        posts: {
          items: [
            {
              comments,
              createdAt: fromUnixTime(time),
              createdBy: by,
              id,
              score,
              title,
              url,
            },
          ],
          size: undefined,
        },
      },
      type: ActionType.ReadPost,
    });
  } catch {
    dispatch({
      meta: {
        id,
        status: Status.Error,
      },
      type: ActionType.ReadPost,
    });
  }
};

export const readPosts = (index: number): ThunkAction => async (
  dispatch: ThunkDispatch,
  getState: () => State,
  { api }: ExtraArgument
): Promise<void> => {
  const {
    page: { size: pageSize },
  } = getState();
  const offset: number = index * pageSize;

  dispatch({
    meta: {
      index,
      status: Status.Request,
    },
    type: ActionType.ReadPosts,
  });

  try {
    const { data } = await axios({
      method: 'get',
      url: `${api}/topstories.json`,
    });
    const itemsSize: number = data.length;
    const ids: number[] = data.slice(offset, offset + pageSize);
    const responses: AxiosResponse[] = await axios.all(
      ids.map((id) =>
        axios({
          method: 'get',
          url: `${api}/item/${id}.json`,
        })
      )
    );
    const posts: Post[] = responses
      .map(({ data }) => data)
      .map(({ by, id, score, time, title, url }) => ({
        comments: undefined,
        createdAt: fromUnixTime(time),
        createdBy: by,
        id,
        score,
        title,
        url,
      }));

    dispatch({
      meta: {
        index,
        status: Status.Success,
      },
      payload: {
        posts: {
          items: posts,
          size: itemsSize,
        },
      },
      type: ActionType.ReadPosts,
    });
  } catch {
    dispatch({
      meta: {
        index,
        status: Status.Error,
      },
      type: ActionType.ReadPosts,
    });
  }
};

export const updateLocation = (pathname: string): ThunkAction => (
  dispatch: ThunkDispatch,
  getState: () => State
): void => {
  const { page } = getState();

  const listingMatch = match<{ index: string }>('/:index(\\d+)?')(pathname);

  if (listingMatch) {
    const pageNum: number = parseInt(listingMatch.params.index, 10);

    dispatch({
      payload: {
        page: {
          ...page,
          index: Number.isNaN(pageNum) ? 0 : pageNum - 1,
        },
        view: [],
      },
      type: ActionType.UpdateLocation,
    });
  }

  const postMatch = match<{ id: string }>('/post/:id(\\d+)?')(pathname);

  if (postMatch) {
    const id: number = parseInt(postMatch.params.id, 10);

    dispatch({
      payload: {
        page,
        view: id,
      },
      type: ActionType.UpdateLocation,
    });
  }
};

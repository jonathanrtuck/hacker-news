import getPost from 'api/getPost';
import getPosts from 'api/getPosts';
import { match } from 'path-to-regexp';
import { Action as ReduxAction } from 'redux';
import {
  ThunkAction as ReduxThunkAction,
  ThunkDispatch as ReduxThunkDispatch,
} from 'redux-thunk';
import { Post, Posts, State } from 'store/state';

export enum ActionType {
  UpdateState = 'UPDATE_STATE',
}

interface StateUpdateAction extends ReduxAction<ActionType> {
  payload?: State;
  type: ActionType.UpdateState;
}

export type Action = StateUpdateAction;

export type ThunkAction = ReduxThunkAction<void, State, undefined, Action>;
export type ThunkDispatch = ReduxThunkDispatch<State, undefined, Action>;

const readPost = (id: number) => async (
  dispatch: ThunkDispatch,
  getState: () => State
): Promise<void> => {
  const state = getState();

  dispatch({
    payload: {
      ...state,
      isBusy: true,
      isError: false,
      view: id,
    },
    type: ActionType.UpdateState,
  });

  try {
    const post: Post = await getPost(id);
    const state = getState();

    dispatch({
      payload: {
        ...state,
        isBusy: false,
        posts: {
          ...state.posts,
          items: [post],
        },
      },
      type: ActionType.UpdateState,
    });
  } catch {
    dispatch({
      payload: {
        ...state,
        isBusy: false,
        isError: true,
      },
      type: ActionType.UpdateState,
    });
  }
};

const readPosts = (index: number) => async (
  dispatch: ThunkDispatch,
  getState: () => State
): Promise<void> => {
  const state = getState();
  const first: number = state.page.size;
  const offset: number = index * state.page.size;

  dispatch({
    payload: {
      ...state,
      isBusy: true,
      isError: false,
      page: {
        ...state.page,
        index,
      },
      view: [],
    },
    type: ActionType.UpdateState,
  });

  try {
    const posts: Posts = await getPosts({
      first,
      offset,
    });
    const state = getState();

    dispatch({
      payload: {
        ...state,
        isBusy: false,
        posts,
        view: posts.items.map(({ id }) => id),
      },
      type: ActionType.UpdateState,
    });
  } catch {
    dispatch({
      payload: {
        ...state,
        isBusy: false,
        isError: true,
      },
      type: ActionType.UpdateState,
    });
  }
};

export const updatePathname = (pathname: string): ThunkAction => {
  const listing = match<{ index: string }>('/:index(\\d+)?')(pathname);

  if (listing) {
    const pageNum: number = parseInt(listing.params.index, 10);
    const index: number = Number.isNaN(pageNum) ? 0 : pageNum - 1;

    return readPosts(index);
  }

  const post = match<{ id: string }>('/post/:id(\\d+)?')(pathname);

  if (post) {
    const id: number = parseInt(post.params.id, 10);

    return readPost(id);
  }
};

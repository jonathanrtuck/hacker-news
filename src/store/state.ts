import { Location } from 'history';

export interface Comment {
  comments: Comment[];
  content: string;
  createdAt: Date;
  createdBy: string;
  id: number;
  isDeleted?: boolean;
}

export interface Post {
  comments: Comment[];
  createdAt: Date;
  createdBy: string;
  id: number;
  score: number;
  title: string;
  url: string;
}

export interface State {
  count: number;
  isBusy: boolean;
  isError: boolean;
  location: Location;
  perPage: number;
  posts: Partial<Post>[];
}

export const INITIAL_STATE: State = {
  count: 0,
  isBusy: false,
  isError: false,
  location: undefined,
  perPage: 20,
  posts: [],
};

import { Location } from 'history';

export interface Post {
  createdAt: Date;
  createdBy: string;
  id: number;
  score: number;
  title: string;
}

export interface State {
  count: number;
  isBusy: boolean;
  location: Location;
  perPage: number;
  posts: Post[];
}

export const INITIAL_STATE: State = {
  count: 0,
  isBusy: false,
  location: undefined,
  perPage: 20,
  posts: [],
};

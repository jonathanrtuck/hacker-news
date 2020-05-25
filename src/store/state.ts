export interface Comment {
  comments: Comment[];
  content: string;
  createdAt: Date;
  createdBy: string;
  id: number;
  isDeleted?: boolean;
}

export interface Page {
  index: number;
  size: number;
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

export interface Posts {
  items: Post[];
  size: number;
}

export interface State {
  isBusy: boolean;
  isError: boolean;
  page: Page;
  posts: Posts;
  view: number | number[];
}

export const INITIAL_STATE: State = {
  isBusy: false,
  isError: false,
  page: {
    index: 0,
    size: 20,
  },
  posts: {
    items: [],
    size: undefined,
  },
  view: [],
};

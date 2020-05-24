import { Location } from 'history';

export interface Item {
  createdAt: Date;
  createdBy: string;
  id: number;
  score: number;
  title: string;
}

export interface State {
  count: number;
  isBusy: boolean;
  items: Item[];
  location: Location;
  perPage: number;
}

export const INITIAL_STATE: State = {
  count: 0,
  isBusy: false,
  items: [],
  location: undefined,
  perPage: 20,
};

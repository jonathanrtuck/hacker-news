import { createBrowserHistory, History, LocationDescriptor } from 'history';

const history: History = createBrowserHistory();

export const navigateTo = (location: LocationDescriptor): void => {
  history.push(location);
};

export default history;

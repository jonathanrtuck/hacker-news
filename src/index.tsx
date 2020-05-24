import { CssBaseline } from '@material-ui/core';
import App from 'components/App';
import { createBrowserHistory, History, Location } from 'history';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import { updateLocation } from 'store/actions';

const history: History = createBrowserHistory();

store.subscribe((): void => {
  console.debug('state', store.getState());
});

store.dispatch(updateLocation(history.location));

history.listen((location: Location): void => {
  store.dispatch(updateLocation(location));
});

render(
  <Fragment>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </Fragment>,
  document.getElementById('root')
);

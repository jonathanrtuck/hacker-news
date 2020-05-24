import { createBrowserHistory, History, Location } from 'history';
import App from 'components/App';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import store, { updateLocation } from 'store';

const history: History = createBrowserHistory();

updateLocation(history.location);

history.listen((location: Location): void => {
  updateLocation(location);
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

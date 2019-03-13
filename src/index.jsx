import App from 'components/App';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import store from 'store';

render(
  <Fragment>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </Fragment>,
  document.getElementById('root')
);

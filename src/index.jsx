import App from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import { LastLocationProvider } from 'react-router-last-location';
import { Provider } from 'react-redux';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import store from 'store';

render(
  <Fragment>
    <CssBaseline />
    <BrowserRouter basename={process.env.PUBLIC_PATH}>
      <LastLocationProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </LastLocationProvider>
    </BrowserRouter>
  </Fragment>,
  document.getElementById('root')
);

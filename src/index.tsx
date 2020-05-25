import { CssBaseline } from '@material-ui/core';
import App from 'components/App';
import { Location } from 'history';
import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from 'store';
import { updatePathname } from 'store/actions';
import history from 'utils/history';

store.dispatch(updatePathname(history.location.pathname));

history.listen(({ pathname }: Location): void => {
  store.dispatch(updatePathname(pathname));
});

render(
  <Fragment>
    <CssBaseline />
    <Provider store={store}>
      <App />
    </Provider>
  </Fragment>,
  document.getElementById('app')
);

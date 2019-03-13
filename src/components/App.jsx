import { get } from 'lodash-es';
import Header from 'components/Header';
import Item from 'components/Item';
import Listing from 'components/Listing';
import React, { Fragment } from 'react';
import { Route, withRouter } from 'react-router-dom';

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const App = () => (
  <Fragment>
    <Header />
    <Route
      exact
      path="/:page?"
      render={({ match }) => (
        <Listing page={parseInt(get(match, 'params.page'), 10) || 0} />
      )}
    />
    <Route
      exact
      path="/item/:id"
      render={({ match }) => (
        <Item id={parseInt(get(match, 'params.id'), 10)} />
      )}
    />
  </Fragment>
);

/**
 * @type {ReactElement}
 */
export default withRouter(App);

import { connect } from 'react-redux';
import { get } from 'lodash-es';
import Header from 'components/Header';
import { isBusy } from 'store/reducer';
import { LinearProgress, Typography } from '@material-ui/core';
import Listing from 'components/Listing';
import { loadPage } from 'store/actions';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const App = (
  { isBusy, items, loadPage } // eslint-disable-line no-shadow
) => {
  useEffect(() => {
    loadPage(0);
  }, []);

  return (
    <Fragment>
      <Header />
      {isBusy ? <LinearProgress /> : <Listing />}
    </Fragment>
  );
};

App.propTypes = {
  isBusy: PropTypes.bool.isRequired,
  loadPage: PropTypes.func.isRequired,
};

/**
 * @type {ReactElement}
 */
export default connect(
  (state) => ({
    isBusy: isBusy(state),
  }),
  {
    loadPage,
  }
)(App);

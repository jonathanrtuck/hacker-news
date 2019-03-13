import { AccessAlarm } from '@material-ui/icons';
import { connect } from 'react-redux';
import { get } from 'lodash-es';
import { getItems, isBusy } from 'store/reducer';
import { LinearProgress } from '@material-ui/core';
import { loadPage } from 'store/actions';
import PropTypes from 'prop-types';
import React, { Component, useEffect } from 'react';
import { Typography } from '@material-ui/core';

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const App = ({ isBusy, items, loadPage }) => {
  useEffect(() => {
    loadPage();
  }, []);

  return isBusy ? (
    <LinearProgress />
  ) : (
    <ul>
      {items.map(({ by, id, score, time, title, url }) => (
        <li key={id}>
          <Typography component="a" href={url}>
            {title}
          </Typography>
        </li>
      ))}
    </ul>
  );
};

App.propTypes = {
  isBusy: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      by: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
      time: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ).isRequired,
  loadPage: PropTypes.func.isRequired,
};

/**
 * @type {ReactElement}
 */
export default connect(
  (state) => ({
    isBusy: isBusy(state),
    items: getItems(state),
  }),
  {
    loadPage,
  }
)(App);

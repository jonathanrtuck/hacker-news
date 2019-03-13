import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { connect } from 'react-redux';
import { get } from 'lodash-es';
import { getTitle } from 'store/reducer';
import PropTypes from 'prop-types';
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { withLastLocation } from 'react-router-last-location';

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const Header = ({ classes, history, lastLocation, title }) => (
  <AppBar color="default" position="sticky">
    <Toolbar>
      <Route
        exact
        path="/item/:id"
        render={() => (
          <IconButton
            className={classes.arrow}
            onClick={() => {
              history.push(get(lastLocation, 'pathname'));
            }}
          >
            <ArrowBack />
          </IconButton>
        )}
      />
      <Typography color="inherit" component="h1" variant="h6">
        {title}
      </Typography>
    </Toolbar>
  </AppBar>
);

Header.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  lastLocation: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  title: PropTypes.string,
};

Header.defaultProps = {
  lastLocation: {
    pathname: '/',
  },
  title: 'Hacker News',
};

/**
 * @type {ReactElement}
 */
export default withRouter(
  withLastLocation(
    connect((state) => ({
      title: getTitle(state),
    }))(
      withStyles((theme) => ({
        arrow: {
          marginRight: theme.spacing.unit,
        },
      }))(Header)
    )
  )
);

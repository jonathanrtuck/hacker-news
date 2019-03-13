import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { connect } from 'react-redux';
import { distanceInWordsToNow } from 'date-fns';
import { fromUnixTime } from 'utils/time';
import { getItems, getNumPages, isBusy } from 'store/reducer';
import {
  Grow,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { loadPage } from 'store/actions';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';

/**
 * @constant
 * @function
 * @param {object} obj
 * @param {by} obj.by
 * @param {number} obj.time
 * @returns {string}
 * @todo i18n.
 */
const getSecondaryText = ({ by, score, time }) =>
  `${score} ${score === 1 ? 'point' : 'points'} by ${by} ${distanceInWordsToNow(
    fromUnixTime(time),
    {
      addSuffix: true,
    }
  )}`;

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const Listing = (
  { classes, isBusy, items, loadPage, numPages, page } // eslint-disable-line no-shadow
) => {
  useEffect(() => {
    loadPage(page);
  }, [page]);

  return isBusy ? (
    <LinearProgress />
  ) : (
    <Fragment>
      <List>
        {items.map(({ by, id, score, time, title }) => (
          <Grow in key={id}>
            <li>
              <ListItem button component={Link} to={`/item/${id}`}>
                <ListItemText
                  primary={title}
                  primaryTypographyProps={{
                    component: 'h2',
                  }}
                  secondary={getSecondaryText({
                    by,
                    score,
                    time,
                  })}
                />
              </ListItem>
            </li>
          </Grow>
        ))}
      </List>
      <nav className={classes.nav}>
        <IconButton
          className={classes.arrow}
          component={Link}
          disabled={page === 0}
          to={`/${page === 1 ? '' : page - 1}`}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          className={classes.arrow}
          component={Link}
          disabled={page === numPages - 1}
          to={`/${page + 1}`}
        >
          <ChevronRight />
        </IconButton>
      </nav>
    </Fragment>
  );
};

Listing.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isBusy: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      by: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
      time: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  loadPage: PropTypes.func.isRequired,
  numPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

/**
 * @type {ReactElement}
 */
export default connect(
  (state) => ({
    isBusy: isBusy(state),
    items: getItems(state),
    numPages: getNumPages(state),
  }),
  {
    loadPage,
  }
)(
  withStyles((theme) => ({
    arrow: {
      margin: theme.spacing.unit,
    },
    nav: {
      display: 'flex',
      justifyContent: 'center',
    },
  }))(Listing)
);

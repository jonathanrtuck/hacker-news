import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { connect } from 'react-redux';
import { distanceInWordsToNow } from 'date-fns';
import { fromUnixTime } from 'utils/time';
import { getItems, getPage, isFirstPage, isLastPage } from 'store/reducer';
import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import { loadItem, loadPage } from 'store/actions';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

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
  { classes, isFirstPage, isLastPage, items, loadItem, loadPage, page } // eslint-disable-line no-shadow
) => (
  <Fragment>
    <List>
      {items.map(({ by, id, score, time, title }) => (
        <ListItem button key={id} onClick={() => loadItem(id)}>
          <ListItemText
            primary={title}
            secondary={getSecondaryText({
              by,
              score,
              time,
            })}
          />
        </ListItem>
      ))}
    </List>
    <nav className={classes.nav}>
      <IconButton
        className={classes.arrow}
        disabled={isFirstPage}
        onClick={() => loadPage(page - 1)}
      >
        <ChevronLeft />
      </IconButton>
      <IconButton
        className={classes.arrow}
        disabled={isLastPage}
        onClick={() => loadPage(page + 1)}
      >
        <ChevronRight />
      </IconButton>
    </nav>
  </Fragment>
);

Listing.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  isFirstPage: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      by: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      score: PropTypes.number.isRequired,
      time: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  loadItem: PropTypes.func.isRequired,
  loadPage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

/**
 * @type {ReactElement}
 */
export default connect(
  (state) => ({
    isFirstPage: isFirstPage(state),
    isLastPage: isLastPage(state),
    items: getItems(state),
    page: getPage(state),
  }),
  {
    loadItem,
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

import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { connect } from 'react-redux';
import { getStories, getNumPages, isBusy } from 'store/reducer';
import {
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { readStories } from 'store/actions';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect } from 'react';
import Subtitle from 'components/Subtitle';

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const Listing = (
  { classes, isBusy, items, readStories, numPages, page } // eslint-disable-line no-shadow
) => {
  useEffect(() => {
    readStories(page);
  }, [page]);

  return isBusy ? (
    <LinearProgress />
  ) : (
    <Fragment>
      <List>
        {items.map(({ by, id, score, time, title }) => (
          <li key={id}>
            <ListItem button component={Link} to={`/item/${id}`}>
              <ListItemText
                primary={title}
                primaryTypographyProps={{
                  component: 'h2',
                }}
                secondary={<Subtitle by={by} score={score} time={time} />}
              />
            </ListItem>
          </li>
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
  numPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  readStories: PropTypes.func.isRequired,
};

/**
 * @type {ReactElement}
 */
export default connect(
  (state) => ({
    isBusy: isBusy(state),
    items: getStories(state),
    numPages: getNumPages(state),
  }),
  {
    readStories,
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

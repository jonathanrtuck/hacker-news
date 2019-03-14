import Comment from 'components/Comment';
import { connect } from 'react-redux';
import {
  getBy,
  getComments,
  getScore,
  getTime,
  getUrl,
  isBusy,
} from 'store/reducer';
import { LinearProgress, Typography, withStyles } from '@material-ui/core';
import { readStory } from 'store/actions';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Subtitle from 'components/Subtitle';

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const Story = (
  { by, classes, comments, id, isBusy, readStory, score, time, url } // eslint-disable-line no-shadow
) => {
  useEffect(() => {
    readStory(id);
  }, [id]);

  return isBusy ? (
    <LinearProgress />
  ) : (
    <article className={classes.root}>
      <Typography component="a" href={url} variant="h6">
        {url}
      </Typography>
      <Typography>
        <Subtitle by={by} score={score} time={time} />
      </Typography>
      <aside>
        <Typography component="h2" variant="srOnly">
          Comments
        </Typography>
        {comments.map(Comment)}
      </aside>
    </article>
  );
};

Story.propTypes = {
  by: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  id: PropTypes.number.isRequired,
  isBusy: PropTypes.bool.isRequired,
  readStory: PropTypes.func.isRequired,
  score: PropTypes.number,
  time: PropTypes.number,
  url: PropTypes.string,
};

Story.defaultProps = {
  by: '',
  score: 0,
  time: 0,
  url: '',
};

/**
 * @type {ReactElement}
 */
export default connect(
  (state, { id }) => ({
    by: getBy(state, id),
    comments: getComments(state, id),
    isBusy: isBusy(state),
    score: getScore(state, id),
    time: getTime(state, id),
    url: getUrl(state, id),
  }),
  {
    readStory,
  }
)(
  withStyles((theme) => ({
    root: {
      padding: theme.spacing.unit * 2,
    },
  }))(Story)
);

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
import { LinearProgress, Typography } from '@material-ui/core';
import { readStory } from 'store/actions';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const Story = (
  { by, comments, id, isBusy, readStory, score, time, url } // eslint-disable-line no-shadow
) => {
  useEffect(() => {
    readStory(id);
  }, [id]);

  return isBusy ? (
    <LinearProgress />
  ) : (
    <div>
      <Typography>{by}</Typography>
      <Typography>{score}</Typography>
      <Typography>{time}</Typography>
      <Typography>{url}</Typography>
      {comments.map(Comment)}
    </div>
  );
};

Story.propTypes = {
  by: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  id: PropTypes.number.isRequired,
  isBusy: PropTypes.bool.isRequired,
  readStory: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
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
)(Story);

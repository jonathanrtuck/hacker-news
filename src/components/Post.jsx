import Comment from 'components/Comment';
import { connect } from 'react-redux';
import {
  getBy,
  getKids,
  getScore,
  getTime,
  getUrl,
  isBusy,
} from 'store/reducer';
import {
  LinearProgress,
  List,
  Typography,
  withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { readPost } from 'store/actions';
import Subtitle from 'components/Subtitle';

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const Story = (
  { by, classes, id, isBusy, kids, readPost, score, time, url } // eslint-disable-line no-shadow
) => {
  useEffect(() => {
    readPost(id);
  }, [id]);

  return isBusy ? (
    <LinearProgress />
  ) : (
    <article className={classes.root}>
      <Typography component="a" href={url} variant="h6">
        {url}
      </Typography>
      <Typography color="textSecondary">
        <Subtitle by={by} score={score} time={time} />
      </Typography>
      <List
        className={classes.comments}
        component="aside"
        subheader={
          <Typography component="h2" variant="srOnly">
            Comments
          </Typography>
        }
      >
        {kids.map((commentId) => (
          <Comment id={commentId} key={commentId} level={1} />
        ))}
      </List>
    </article>
  );
};

Story.propTypes = {
  by: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
  isBusy: PropTypes.bool.isRequired,
  kids: PropTypes.arrayOf(PropTypes.number),
  readPost: PropTypes.func.isRequired,
  score: PropTypes.number,
  time: PropTypes.number,
  url: PropTypes.string,
};

Story.defaultProps = {
  by: '',
  kids: [],
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
    isBusy: isBusy(state),
    kids: getKids(state, id),
    score: getScore(state, id),
    time: getTime(state, id),
    url: getUrl(state, id),
  }),
  {
    readPost,
  }
)(
  withStyles((theme) => ({
    comments: {
      marginTop: theme.spacing.unit * 2,
    },
    root: {
      padding: theme.spacing.unit * 2,
    },
  }))(Story)
);

import { connect } from 'react-redux';
import { getBy, getKids, getText, getTime } from 'store/reducer';
import { isEmpty } from 'lodash-es';
import {
  ListItem,
  ListItemText,
  Typography,
  withTheme,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import Subtitle from 'components/Subtitle';

/**
 * @constant
 * @function
 * @param {object} props
 * @recursive
 * @returns {ReactElement}
 */
const Comment = ({ by, kids, level, text, theme, time }) => (
  <Fragment>
    <ListItem
      component="article"
      style={{
        paddingLeft:
          theme.spacing.unit * 4 * (level - 1) + theme.spacing.unit * 2,
      }}
    >
      <ListItemText
        primary={
          <Typography color="textSecondary" variant="subtitle2">
            <Subtitle by={by} time={time} />
          </Typography>
        }
        secondary={<Typography dangerouslySetInnerHTML={{ __html: text }} />}
      />
    </ListItem>
    {!isEmpty(kids) &&
      kids.map((commentId) => (
        <ConnectedComment id={commentId} key={commentId} level={level + 1} />
      ))}
  </Fragment>
);

Comment.propTypes = {
  by: PropTypes.string,
  kids: PropTypes.arrayOf(PropTypes.number),
  level: PropTypes.number.isRequired,
  text: PropTypes.string,
  theme: PropTypes.objectOf(PropTypes.any).isRequired,
  time: PropTypes.number,
};

Comment.defaultProps = {
  by: '',
  kids: [],
  text: '',
  time: 0,
};

/**
 * @type {ReactElement}
 */
const ConnectedComment = connect((state, { id }) => ({
  by: getBy(state, id),
  kids: getKids(state, id),
  text: getText(state, id),
  time: getTime(state, id),
}))(withTheme()(Comment));

export default ConnectedComment;

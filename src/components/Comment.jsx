import PropTypes from 'prop-types';
import React from 'react';
import { Typography } from '@material-ui/core';

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const Comment = ({ id }) => <Typography key={id}>{id}</Typography>;

Comment.propTypes = {
  id: PropTypes.number.isRequired,
};

/**
 * @type {ReactElement}
 */
export default Comment;

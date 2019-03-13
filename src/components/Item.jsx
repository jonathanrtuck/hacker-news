import { connect } from 'react-redux';
import { isBusy } from 'store/reducer';
import { LinearProgress, Typography } from '@material-ui/core';
import { loadItem } from 'store/actions';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const Item = (
  { id, isBusy, loadItem } // eslint-disable-line no-shadow
) => {
  useEffect(() => {
    loadItem(id);
  }, [id]);

  return isBusy ? <LinearProgress /> : <Typography>item…</Typography>;
};

Item.propTypes = {
  id: PropTypes.number.isRequired,
  isBusy: PropTypes.bool.isRequired,
  loadItem: PropTypes.func.isRequired,
};

/**
 * @type {ReactElement}
 */
export default connect(
  (state) => ({
    isBusy: isBusy(state),
  }),
  {
    loadItem,
  }
)(Item);

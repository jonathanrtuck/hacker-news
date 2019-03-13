import { AppBar, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

/**
 * @constant
 * @function
 * @param {object} props
 * @returns {ReactElement}
 */
const Header = () => (
  <AppBar color="default" position="static">
    <Toolbar>
      <Typography color="inherit" component="h1" variant="h6">
        Hacker News
      </Typography>
    </Toolbar>
  </AppBar>
);

/**
 * @type {ReactElement}
 */
export default Header;

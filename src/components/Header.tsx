import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import React, { FunctionComponent, MouseEvent, ReactElement } from 'react';
import { navigateTo } from 'utils/history';

interface HeaderProps {
  shouldShowBackButton?: boolean;
  title?: string;
}

const useStyles = makeStyles((theme) => ({
  arrow: {
    marginRight: theme.spacing(1),
  },
}));

export const Header: FunctionComponent<HeaderProps> = ({
  shouldShowBackButton,
  title = 'Hacker News',
}: HeaderProps): ReactElement => {
  const classes = useStyles();

  return (
    <AppBar color="default" position="sticky">
      <Toolbar>
        {shouldShowBackButton && (
          <IconButton
            className={classes.arrow}
            component="a"
            href="/"
            onClick={(event: MouseEvent): void => {
              event.preventDefault();

              navigateTo({
                pathname: '/',
              });
            }}
          >
            <ArrowBack />
          </IconButton>
        )}
        <Typography color="inherit" component="h1" variant="h6">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

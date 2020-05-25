import {
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight, Error } from '@material-ui/icons';
import Subtitle from 'components/Subtitle';
import React, {
  Fragment,
  FunctionComponent,
  MouseEvent,
  ReactElement,
} from 'react';
import { connect } from 'react-redux';
import { Post, State } from 'store/state';
import { navigateTo } from 'utils/history';

interface ListingProps {
  index: number;
  indexOffset: number;
  isBusy: boolean;
  isError: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  posts: Post[];
}

const mapStateToProps = (
  state: State,
  { index }: Partial<ListingProps>
): Partial<ListingProps> => ({
  indexOffset: index * state.page.size,
  isBusy: state.isBusy,
  isError: state.isError,
  isFirstPage: index === 0,
  isLastPage: index === Math.ceil(state.posts.size / state.page.size),
  posts: Array.isArray(state.view)
    ? state.view.map((id) => state.posts.items.find((post) => post.id === id))
    : [],
});

const useStyles = makeStyles((theme) => ({
  arrow: {
    margin: theme.spacing(1),
  },
  nav: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export const Listing: FunctionComponent<ListingProps> = ({
  index,
  indexOffset,
  isBusy,
  isError,
  isFirstPage,
  isLastPage,
  posts,
}: ListingProps): ReactElement => {
  const classes = useStyles();

  if (isBusy) {
    return <LinearProgress />;
  }

  if (isError) {
    return (
      <Snackbar
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        open
      >
        <Error color="secondary" fontSize="large" />
      </Snackbar>
    );
  }

  return (
    <Fragment>
      <List>
        {posts.map(({ createdAt, createdBy, id, score, title }, i: number) => (
          <li key={id}>
            <ListItem
              button
              component="a"
              href={`/post/${id}`}
              onClick={(event: MouseEvent): void => {
                event.preventDefault();

                navigateTo({
                  pathname: `/post/${id}`,
                });
              }}
            >
              <ListItemIcon>
                <Typography color="textSecondary" variant="overline">
                  {indexOffset + i + 1}
                </Typography>
              </ListItemIcon>
              <ListItemText
                primary={title}
                primaryTypographyProps={{
                  component: 'h2',
                }}
                secondary={
                  <Subtitle
                    createdAt={createdAt}
                    createdBy={createdBy}
                    score={score}
                  />
                }
              />
            </ListItem>
          </li>
        ))}
      </List>
      <nav className={classes.nav}>
        <IconButton
          className={classes.arrow}
          disabled={isFirstPage}
          onClick={(): void => {
            navigateTo({
              pathname: `/${index === 1 ? '' : index}`,
            });
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          className={classes.arrow}
          disabled={isLastPage}
          onClick={(): void => {
            navigateTo({
              pathname: `/${index + 2}`,
            });
          }}
        >
          <ChevronRight />
        </IconButton>
      </nav>
    </Fragment>
  );
};

export default connect(mapStateToProps)(Listing);

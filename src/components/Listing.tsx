import {
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  withStyles,
} from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import Subtitle from 'components/Subtitle';
import React, {
  Fragment,
  FunctionComponent,
  MouseEvent,
  ReactElement,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import { readPosts } from 'store/actions';
import { Post, State } from 'store/state';
import { navigateTo } from 'utils/history';

interface ListingProps {
  indexOffset: number;
  isBusy: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  page: number;
  posts: Post[];
  readPosts: typeof readPosts;
}

export const Listing: FunctionComponent<ListingProps> = ({
  indexOffset,
  isBusy,
  isFirstPage,
  isLastPage,
  page,
  posts,
  readPosts,
}: ListingProps): ReactElement => {
  useEffect(() => {
    readPosts(page);
  }, [page]);

  if (isBusy) {
    return <LinearProgress />;
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
      <nav>
        <IconButton
          disabled={isFirstPage}
          onClick={(): void => {
            navigateTo({
              pathname: `/${page === 2 ? '' : page - 1}`,
            });
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          disabled={isLastPage}
          onClick={(): void => {
            navigateTo({
              pathname: `/${page + 1}`,
            });
          }}
        >
          <ChevronRight />
        </IconButton>
      </nav>
    </Fragment>
  );
};

export default connect(
  (state: State, { page }: any) => ({
    indexOffset: (page - 1) * state.perPage,
    isBusy: state.isBusy,
    isFirstPage: page === 1,
    isLastPage: page === Math.ceil(state.count / state.perPage),
    posts: state.posts,
  }),
  {
    readPosts,
  }
)(Listing);

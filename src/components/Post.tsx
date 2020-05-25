import {
  LinearProgress,
  List,
  makeStyles,
  Snackbar,
  Typography,
} from '@material-ui/core';
import { Error } from '@material-ui/icons';
import Comment from 'components/Comment';
import Subtitle from 'components/Subtitle';
import React, { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Comment as CommentType, State } from 'store/state';

interface PostProps {
  comments: CommentType[];
  createdAt: Date;
  createdBy: string;
  id: number;
  isBusy: boolean;
  isError: boolean;
  score: number;
  url: string;
}

const mapStateToProps = (
  state: State,
  { id }: Partial<PostProps>
): Partial<PostProps> => {
  const post = state.posts.items.find((post) => post.id === id);

  return {
    comments: post?.comments ?? [],
    createdAt: post?.createdAt,
    createdBy: post?.createdBy,
    isBusy: state.isBusy,
    isError: state.isError,
    score: post?.score,
    url: post?.url,
  };
};

const useStyles = makeStyles((theme) => ({
  comments: {
    marginTop: theme.spacing(2),
  },
  root: {
    padding: theme.spacing(2),
  },
}));

export const Post: FunctionComponent<PostProps> = ({
  comments,
  createdAt,
  createdBy,
  id,
  isBusy,
  isError,
  score,
  url,
}: PostProps): ReactElement => {
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
    <article className={classes.root}>
      <Typography component="a" href={url} variant="h6">
        {url}
      </Typography>
      <Typography color="textSecondary">
        <Subtitle createdAt={createdAt} createdBy={createdBy} score={score} />
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
        {comments.map(
          ({
            comments,
            content,
            createdAt,
            createdBy,
            id,
            isDeleted,
          }): ReactElement => (
            <Comment
              comments={comments}
              content={content}
              createdAt={createdAt}
              createdBy={createdBy}
              isDeleted={isDeleted}
              key={id}
              level={1}
            />
          )
        )}
      </List>
    </article>
  );
};

export default connect(mapStateToProps)(Post);

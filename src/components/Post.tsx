import {
  LinearProgress,
  List,
  makeStyles,
  Typography,
} from '@material-ui/core';
import Comment from 'components/Comment';
import Subtitle from 'components/Subtitle';
import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { readPost } from 'store/actions';
import { Comment as CommentType, Post as PostType, State } from 'store/state';

const useStyles = makeStyles((theme) => ({
  comments: {
    marginTop: theme.spacing(2),
  },
  root: {
    padding: theme.spacing(2),
  },
}));

interface PostProps {
  comments: CommentType[];
  createdAt: Date;
  createdBy: string;
  id: number;
  isBusy: boolean;
  isError: boolean;
  readPost: typeof readPost;
  score: number;
  url: string;
}

export const Post: FunctionComponent<PostProps> = ({
  comments,
  createdAt,
  createdBy,
  id,
  isBusy,
  isError,
  readPost,
  score,
  url,
}: PostProps): ReactElement => {
  const classes = useStyles();

  useEffect(() => {
    readPost(id);
  }, [id]);

  if (isBusy) {
    return <LinearProgress />;
  }

  if (isError) {
    /**
     * @todo
     */
    return <h1>error…</h1>;
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
          }: CommentType): ReactElement => (
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

export default connect(
  (state: State, { id }: Partial<PostProps>) => {
    const post: Partial<PostType> = state.posts.find((post) => post.id === id);

    return {
      comments: post?.comments ?? [],
      createdAt: post?.createdAt,
      createdBy: post?.createdBy,
      isBusy: state.isBusy,
      isError: state.isError,
      score: post?.score,
      url: post?.url,
    };
  },
  {
    readPost,
  }
)(Post);

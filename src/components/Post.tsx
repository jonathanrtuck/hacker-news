import {
  LinearProgress,
  List,
  Typography,
  withStyles,
} from '@material-ui/core';
import Comment from 'components/Comment';
import Subtitle from 'components/Subtitle';
import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { readPost } from 'store/actions';
import { Comment as CommentType, Post as PostType, State } from 'store/state';

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
    <article>
      <Typography component="a" href={url} variant="h6">
        {url}
      </Typography>
      <Typography color="textSecondary">
        <Subtitle createdAt={createdAt} createdBy={createdBy} score={score} />
      </Typography>
      <List
        component="aside"
        subheader={
          <Typography component="h2" variant="srOnly">
            Comments
          </Typography>
        }
      >
        {comments.map(
          ({ id }: CommentType): ReactElement => (
            <Comment id={id} key={id} level={1} />
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

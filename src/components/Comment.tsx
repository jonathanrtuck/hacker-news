import {
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from '@material-ui/core';
import Subtitle from 'components/Subtitle';
import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import { Comment as CommentType } from 'store/state';

interface CommentProps {
  comments: CommentType[];
  createdAt: Date;
  createdBy: string;
  content: string;
  isDeleted?: boolean;
  level: number;
}

export const Comment: FunctionComponent<CommentProps> = ({
  comments,
  createdAt,
  createdBy,
  content,
  isDeleted,
  level,
}: CommentProps): ReactElement => {
  const theme = useTheme();

  if (isDeleted) {
    return null;
  }

  return (
    <Fragment>
      <ListItem
        component="article"
        style={{
          paddingLeft: theme.spacing(4 * level),
        }}
      >
        <ListItemText
          primary={
            <Typography color="textSecondary" variant="subtitle2">
              <Subtitle createdAt={createdAt} createdBy={createdBy} />
            </Typography>
          }
          secondary={
            <Typography dangerouslySetInnerHTML={{ __html: content }} />
          }
        />
      </ListItem>
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
            level={level + 1}
          />
        )
      )}
    </Fragment>
  );
};

export default Comment;

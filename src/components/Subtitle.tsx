import { formatDistanceToNow } from 'date-fns';
import React, { Fragment, FunctionComponent, ReactElement } from 'react';

interface SubtitleProps {
  createdAt: Date;
  createdBy: string;
  score?: number;
}

export const Subtitle: FunctionComponent<SubtitleProps> = ({
  createdAt,
  createdBy,
  score,
}: SubtitleProps): ReactElement => (
  <Fragment>
    {Number.isInteger(score)
      ? `${score} ${score === 1 ? 'point' : 'points'} `
      : ''}
    by {createdBy} {createdAt && formatDistanceToNow(createdAt)}
  </Fragment>
);

export default Subtitle;

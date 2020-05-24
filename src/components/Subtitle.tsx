import { formatDistanceToNow } from 'date-fns';
import React, { FunctionComponent, ReactElement } from 'react';

interface SubtitleProps {
  createdAt: Date;
  createdBy: string;
  score: number;
}

export const Subtitle: FunctionComponent<SubtitleProps> = ({
  createdAt,
  createdBy,
  score,
}: SubtitleProps): ReactElement => (
  <span>
    {score} {score === 1 ? 'point' : 'points'} by {createdBy}{' '}
    {formatDistanceToNow(createdAt)}
  </span>
);

export default Subtitle;

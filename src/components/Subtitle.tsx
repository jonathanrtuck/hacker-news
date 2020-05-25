import { formatDistanceToNow } from 'date-fns';
import { isNil } from 'lodash-es';
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
    {!isNil(createdAt) && formatDistanceToNow(createdAt)}
  </span>
);

export default Subtitle;

import React, { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { State } from 'store/state';

interface CommentProps {
  id: number;
  level: number;
}

export const Comment: FunctionComponent<CommentProps> = ({
  level,
}: CommentProps): ReactElement => <h1>comment…</h1>;

export default connect((state: State, { id }: Partial<CommentProps>) => ({
  //
}))(Comment);

import React, { FunctionComponent, ReactElement } from 'react';

interface PostProps {
  id: number;
}

export const Post: FunctionComponent<PostProps> = ({
  id,
}: PostProps): ReactElement => <h1>post… {id}</h1>;

export default Post;

import React, { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { readPosts } from 'store/actions';
import { State } from 'store/state';

interface PostProps {
  isBusy: boolean;
  page: number;
  readPosts: (page: number) => void;
}

export const Listing: FunctionComponent<PostProps> = ({
  isBusy,
  page,
  readPosts,
}: PostProps): ReactElement => {
  useEffect(() => {
    readPosts(page);
  }, [page]);

  if (isBusy) {
    return <h1>loading… {page}</h1>;
  }

  return <h1>listing… {page}</h1>;
};

export default connect(
  (state: State) => ({
    isBusy: state.isBusy,
  }),
  {
    readPosts,
  }
)(Listing);

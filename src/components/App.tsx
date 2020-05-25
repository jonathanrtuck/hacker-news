import Header from 'components/Header';
import Listing from 'components/Listing';
import Post from 'components/Post';
import { match } from 'path-to-regexp';
import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { Post as PostType, State } from 'store/state';

interface AppProps {
  id?: number;
  page?: number;
  shouldShowBackButton?: boolean;
  title?: string;
}

export const App: FunctionComponent<AppProps> = ({
  id,
  page,
  shouldShowBackButton,
  title,
}: AppProps): ReactElement => (
  <Fragment>
    <Header shouldShowBackButton={shouldShowBackButton} title={title} />
    {page && <Listing page={page} />}
    {id && <Post id={id} />}
  </Fragment>
);

export default connect((state: State) => {
  const listingMatch = match<{ index: string }>('/:index(\\d+)?')(
    state.location?.pathname
  );

  if (listingMatch) {
    const index: number = parseInt(listingMatch.params.index, 10);
    const page: number = isNaN(index) ? 1 : index;

    return {
      page,
    };
  }

  const postMatch = match<{ id: string }>('/post/:id(\\d+)?')(
    state.location?.pathname
  );

  if (postMatch) {
    const id: number = parseInt(postMatch.params.id, 10);
    const post: Partial<PostType> = state.posts.find((post) => post.id === id);

    return {
      id,
      shouldShowBackButton: true,
      title: post?.title,
    };
  }
})(App);

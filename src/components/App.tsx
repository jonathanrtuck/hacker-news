import Header from 'components/Header';
import Listing from 'components/Listing';
import Post from 'components/Post';
import { find, matchesProperty } from 'lodash-es';
import { match } from 'path-to-regexp';
import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { State } from 'store/state';

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
  const list = match<{ index: string }>('/:index(\\d+)?')(
    state.location?.pathname
  );
  const post = match<{ id: string }>('/post/:id(\\d+)?')(
    state.location?.pathname
  );

  if (list) {
    const index = parseInt(list.params.index, 10);
    const page = isNaN(index) ? 1 : index;

    return {
      page,
    };
  }

  if (post) {
    const id = parseInt(post.params.id, 10);

    return {
      id,
      shouldShowBackButton: true,
      title: find(state.posts, matchesProperty('id', id))?.title,
    };
  }
})(App);

import { connect } from 'react-redux';
import Listing from 'components/Listing';
import { Location } from 'history';
import { match } from 'path-to-regexp';
import Post from 'components/Post';
import React, { FunctionComponent, ReactElement } from 'react';
import { State } from 'store';

interface AppProps {
  location: Location;
}

export const App: FunctionComponent<AppProps> = ({
  location,
}: AppProps): ReactElement => {
  const listing = match<{ index: string }>('/:index(\\d+)?')(
    location?.pathname
  );
  const post = match<{ id: string }>('/item/:id(\\d+)?')(location?.pathname);

  if (listing) {
    const index = parseInt(listing.params.index, 10);
    const page = isNaN(index) ? 1 : index;

    return <Listing page={page} />;
  }

  if (post) {
    const id = parseInt(post.params.id, 10);

    return <Post id={id} />;
  }

  return <h1>error…</h1>;
};

export default connect((state: State) => ({
  location: state.location,
}))(App);

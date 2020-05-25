import Header from 'components/Header';
import Listing from 'components/Listing';
import Post from 'components/Post';
import React, { Fragment, FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import { State } from 'store/state';

interface AppProps {
  id?: number;
  index?: number;
  shouldShowBackButton?: boolean;
  title?: string;
}

const mapStateToProps = (state: State): Partial<AppProps> => {
  if (Array.isArray(state.view)) {
    return {
      index: state.page.index,
    };
  }

  const post = state.posts.items.find(({ id }) => id === state.view);

  return {
    id: state.view,
    shouldShowBackButton: true,
    title: post?.title,
  };
};

export const App: FunctionComponent<AppProps> = ({
  id,
  index,
  shouldShowBackButton,
  title,
}: AppProps): ReactElement => (
  <Fragment>
    <Header shouldShowBackButton={shouldShowBackButton} title={title} />
    {Number.isInteger(index) && <Listing index={index} />}
    {Number.isInteger(id) && <Post id={id} />}
  </Fragment>
);

export default connect(mapStateToProps)(App);

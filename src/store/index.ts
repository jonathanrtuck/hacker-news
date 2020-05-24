import { createStore } from 'redux';
import reducer from 'store/reducer';

export { readPost, readPosts, updateLocation } from 'store/actions';

export default createStore(reducer);

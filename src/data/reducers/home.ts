import { FETCH_BLOGS } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { Home, Blog } from './types';

const initialState: Home = initialStateDecorator({
  blogsById: {},
  allBlogIds: ['celoorg']
});

const fetchBlogs = (state, { blogsById }): { state: Home; blogs: { [key: string]: Blog } } => ({
  ...state,
  blogsById
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_BLOGS:
      return evalActionPayload(state, action, fetchBlogs);
    default:
      return state;
  }
};

import { FETCH_BLOGS } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { Home, Blog } from './types';

const initialState: Home = initialStateDecorator({
  blogs: {},
  blogIds: ['celoorg']
});

export default (state = initialState, action) => {
  const { type } = action;

  const fetchBlogs = (state, { blogs }): { state: Home; blogs: { [key: string]: Blog } } => ({
    ...state,
    blogs
  });

  switch (type) {
    case FETCH_BLOGS:
      return evalActionPayload(state, action, fetchBlogs);
    default:
      return state;
  }
};

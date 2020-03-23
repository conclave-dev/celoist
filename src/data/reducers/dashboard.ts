import { FETCH_BLOGS } from './../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { Dashboard, Blog } from './types';

const initialState: Dashboard = initialStateDecorator({
  blogs: {},
  blogIds: ['celoorg']
});

export default (state = initialState, action) => {
  const { type } = action;

  const fetchBlogs = (state, { blogs }): { state: Dashboard; blogs: { [key: string]: Blog } } => ({
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

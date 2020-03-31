import { FETCH_BLOGS } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { BlogsById, AllBlogIds } from '../types/home';

interface Home {
  blogsById: BlogsById;
  allBlogIds: AllBlogIds;
}

type FetchBlogs = { state: Home; blogs: { [key: string]: BlogsById } };

const homeState: Home = {
  blogsById: {},
  allBlogIds: ['celoorg']
};

const initialState: Home = initialStateDecorator(homeState);

const fetchBlogs = (state, { blogsById }): FetchBlogs => ({
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

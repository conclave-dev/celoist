import { GET_HOME_DATA } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { BlogsById, AllBlogIds } from '../types/home';

interface Home {
  blogsById: BlogsById;
  allBlogIds: AllBlogIds;
  totalSupply: number;
}

type FetchBlogs = { state: Home; payload };

const homeState: Home = {
  blogsById: {},
  allBlogIds: ['celoorg'],
  totalSupply: 0
};

const initialState: Home = initialStateDecorator(homeState);

const getHomeData = (state, { blogsById, totalSupply }): FetchBlogs => ({
  ...state,
  blogsById,
  totalSupply
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case GET_HOME_DATA:
      return evalActionPayload(state, action, getHomeData);
    default:
      return state;
  }
};

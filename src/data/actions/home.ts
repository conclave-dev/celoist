import { FETCH_BLOGS } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { fetchMediumBlogs } from '../fetch/home';

const fetchBlogs = () => async (dispatch, getState) => {
  handleInit(dispatch, FETCH_BLOGS);

  try {
    const { allBlogIds } = getState().home;
    return handleData(dispatch, FETCH_BLOGS, { blogs: await fetchMediumBlogs(allBlogIds) });
  } catch (err) {
    return handleError(dispatch, FETCH_BLOGS, { err });
  }
};

export { fetchBlogs };

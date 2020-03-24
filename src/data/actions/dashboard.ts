import { FETCH_BLOGS } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { fetchMediumBlogs } from '../fetch/dashboard';

const fetchBlogs = () => async (dispatch, getState) => {
  handleInit(dispatch, FETCH_BLOGS);

  try {
    const { blogIds } = getState().dashboard;
    return handleData(dispatch, FETCH_BLOGS, { blogs: await fetchMediumBlogs(blogIds) });
  } catch (err) {
    return handleError(dispatch, FETCH_BLOGS, { err });
  }
};

export { fetchBlogs };

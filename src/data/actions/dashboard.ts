import { FETCH_BLOGS } from './actions';
import { actionWrapper } from '../util/actions';
import { fetchMediumBlogs } from '../fetch/dashboard';

const fetchBlogs = () => async (dispatch, getState) => {
  const action = actionWrapper({ type: FETCH_BLOGS });

  try {
    dispatch(action.init());
    const { blogIds } = getState().dashboard;
    return dispatch(action.packData({ blogs: await fetchMediumBlogs(blogIds) }));
  } catch (err) {
    dispatch(action.packError({ err }));
    throw err;
  }
};

export { fetchBlogs };

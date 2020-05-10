import { GET_HOME_DATA } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { fetchMediumBlogs, fetchTotalSupply } from '../fetch/home';

const getHomeData = () => async (dispatch, getState) => {
  handleInit(dispatch, GET_HOME_DATA);

  try {
    const { allBlogIds } = getState().home;
    const { networkID } = getState().network;
    const blogsById = await fetchMediumBlogs(allBlogIds);
    const totalSupply = await fetchTotalSupply(networkID);
    console.log(networkID + ' : ' + totalSupply);
    return handleData(dispatch, GET_HOME_DATA, { blogsById, totalSupply });
  } catch (err) {
    return handleError(dispatch, GET_HOME_DATA, err);
  }
};

export { getHomeData };

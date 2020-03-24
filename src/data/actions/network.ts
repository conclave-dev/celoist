import { FETCH_GROUPS } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { getValidatorGroupsVotes } from '../fetch/network';

const fetchGroups = () => async dispatch => {
  handleInit(dispatch, FETCH_GROUPS);

  try {
    return handleData(dispatch, FETCH_GROUPS, { groups: await getValidatorGroupsVotes() });
  } catch (err) {
    return handleError(dispatch, FETCH_GROUPS, { err });
  }
};

export { fetchGroups };

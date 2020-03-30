import { FETCH_GROUPS, FETCH_GROUP_DETAILS } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { getEligibleGroups, getElectedGroupDetails } from '../fetch/elections';

const fetchGroups = () => async dispatch => {
  handleInit(dispatch, FETCH_GROUPS);

  try {
    const groups = await getEligibleGroups();
    return handleData(dispatch, FETCH_GROUPS, { groupsById: groups, allGroupIds: Object.keys(groups) });
  } catch (err) {
    return handleError(dispatch, FETCH_GROUPS, { err });
  }
};

const fetchGroupDetails = (groupId: string) => async dispatch => {
  handleInit(dispatch, FETCH_GROUP_DETAILS);

  try {
    return handleData(dispatch, FETCH_GROUP_DETAILS, { groupDetails: await getElectedGroupDetails(groupId), groupId });
  } catch (err) {
    return handleError(dispatch, FETCH_GROUP_DETAILS, { err });
  }
};

export { fetchGroups, fetchGroupDetails };

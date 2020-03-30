import { FETCH_GROUPS, FETCH_GROUP_DETAILS, SET_SELECTED_GROUP_ID } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { getEligibleGroups, getElectedGroupDetails } from '../fetch/elections';

const fetchGroups = () => async dispatch => {
  handleInit(dispatch, FETCH_GROUPS);

  try {
    const { groupsById, allGroupIds } = await getEligibleGroups();
    return handleData(dispatch, FETCH_GROUPS, { groupsById, allGroupIds });
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

const setSelectedGroupId = (groupId: string) => async (dispatch, getStore) => {
  handleInit(dispatch, SET_SELECTED_GROUP_ID);

  try {
    const { selectedGroupId } = getStore().elections;

    return handleData(dispatch, SET_SELECTED_GROUP_ID, { selectedGroupId: selectedGroupId !== groupId ? groupId : '' });
  } catch (err) {
    return handleError(dispatch, SET_SELECTED_GROUP_ID, { err });
  }
};

export { fetchGroups, fetchGroupDetails, setSelectedGroupId };

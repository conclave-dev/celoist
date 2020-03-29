import { FETCH_GROUPS, FETCH_PROPOSALS, FETCH_GROUP_MEMBERS, FETCH_GROUP_DETAILS } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import {
  getElectedGroups,
  getElectedGroupMembers,
  getGovernanceProposals,
  getElectedGroupDetails
} from '../fetch/network';

const fetchGroups = () => async dispatch => {
  handleInit(dispatch, FETCH_GROUPS);

  try {
    return handleData(dispatch, FETCH_GROUPS, { groups: await getElectedGroups() });
  } catch (err) {
    return handleError(dispatch, FETCH_GROUPS, { err });
  }
};

const fetchGroupMembers = () => async dispatch => {
  handleInit(dispatch, FETCH_GROUP_MEMBERS);

  try {
    return handleData(dispatch, FETCH_GROUP_MEMBERS, { groupMembers: await getElectedGroupMembers() });
  } catch (err) {
    return handleError(dispatch, FETCH_GROUP_MEMBERS, { err });
  }
};

const fetchGroupDetails = (groupAddress: string) => async dispatch => {
  handleInit(dispatch, FETCH_GROUP_DETAILS);

  try {
    return handleData(dispatch, FETCH_GROUP_DETAILS, { groupDetails: await getElectedGroupDetails(groupAddress) });
  } catch (err) {
    return handleError(dispatch, FETCH_GROUP_DETAILS, { err });
  }
};

const fetchProposals = () => async dispatch => {
  handleInit(dispatch, FETCH_PROPOSALS);

  try {
    return handleData(dispatch, FETCH_PROPOSALS, { proposals: await getGovernanceProposals() });
  } catch (err) {
    return handleError(dispatch, FETCH_PROPOSALS, { err });
  }
};

export { fetchGroups, fetchGroupMembers, fetchGroupDetails, fetchProposals };

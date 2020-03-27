import { FETCH_GROUPS, FETCH_PROPOSALS } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { getValidatorGroupsVotes, getGovernanceProposals } from '../fetch/network';

const fetchGroups = () => async dispatch => {
  handleInit(dispatch, FETCH_GROUPS);

  try {
    return handleData(dispatch, FETCH_GROUPS, { groups: await getValidatorGroupsVotes() });
  } catch (err) {
    return handleError(dispatch, FETCH_GROUPS, { err });
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

export { fetchGroups, fetchProposals };

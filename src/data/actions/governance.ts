import { FETCH_PROPOSALS } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { getGovernanceProposals } from '../fetch/governance';

const fetchProposals = () => async dispatch => {
  handleInit(dispatch, FETCH_PROPOSALS);

  try {
    return handleData(dispatch, FETCH_PROPOSALS, { proposalsById: await getGovernanceProposals() });
  } catch (err) {
    return handleError(dispatch, FETCH_PROPOSALS, { err });
  }
};

export { fetchProposals };

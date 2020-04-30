import { FETCH_PROPOSALS } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { getGovernanceProposals } from '../fetch/governance';

const fetchProposals = () => async (dispatch) => {
  handleInit(dispatch, FETCH_PROPOSALS);

  try {
    const {
      queuedProposalsById,
      dequeuedProposalsById,
      allQueuedProposalIds,
      allDequeuedProposalIds
    } = await getGovernanceProposals();

    return handleData(dispatch, FETCH_PROPOSALS, {
      queuedProposalsById,
      dequeuedProposalsById,
      allQueuedProposalIds,
      allDequeuedProposalIds
    });
  } catch (err) {
    return handleError(dispatch, FETCH_PROPOSALS, err);
  }
};

export { fetchProposals };

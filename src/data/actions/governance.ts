import { FETCH_PROPOSALS, FILTER_PROPOSALS_BY_STAGE } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { getGovernanceProposals } from '../fetch/governance';

const fetchProposals = () => async (dispatch, getState) => {
  handleInit(dispatch, FETCH_PROPOSALS);

  try {
    const { networkID } = getState().network;
    const {
      queuedProposalsByStage,
      dequeuedProposalsByStage,
      allQueuedProposalStages,
      allDequeuedProposalStages
    } = await getGovernanceProposals(networkID);

    return handleData(dispatch, FETCH_PROPOSALS, {
      queuedProposalsByStage,
      dequeuedProposalsByStage,
      allQueuedProposalStages,
      allDequeuedProposalStages
    });
  } catch (err) {
    return handleError(dispatch, FETCH_PROPOSALS, err);
  }
};

const filterProposalsByStage = (stage: string) => async (dispatch) =>
  handleData(dispatch, FILTER_PROPOSALS_BY_STAGE, { stageFilter: stage });

export { fetchProposals, filterProposalsByStage };

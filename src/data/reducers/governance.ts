import { FETCH_PROPOSALS, FILTER_PROPOSALS_BY_STAGE } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { ProposalsByStage, AllProposalStages } from '../types/governance';

interface Governance {
  queuedProposalsByStage: ProposalsByStage;
  dequeuedProposalsByStage: ProposalsByStage;
  allQueuedProposalStages: AllProposalStages;
  allDequeuedProposalStages: AllProposalStages;
  stageFilter: string;
}

const governance: Governance = {
  queuedProposalsByStage: {},
  dequeuedProposalsByStage: {},
  allQueuedProposalStages: [],
  allDequeuedProposalStages: [],
  stageFilter: ''
};

const initialState = initialStateDecorator(governance);

const fetchProposals = (
  state,
  { queuedProposalsByStage, dequeuedProposalsByStage, allQueuedProposalStages, allDequeuedProposalStages }
) => {
  return {
    ...state,
    queuedProposalsByStage,
    dequeuedProposalsByStage,
    allQueuedProposalStages,
    allDequeuedProposalStages,
    stageFilter: allDequeuedProposalStages[0] || allQueuedProposalStages[0]
  };
};

const filterProposalsByStage = (state, { stageFilter }) => ({
  ...state,
  stageFilter
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_PROPOSALS:
      return evalActionPayload(state, action, fetchProposals);
    case FILTER_PROPOSALS_BY_STAGE:
      return evalActionPayload(state, action, filterProposalsByStage);
    default:
      return state;
  }
};

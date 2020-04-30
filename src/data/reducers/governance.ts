import { FETCH_PROPOSALS } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { ProposalsById, AllProposalIds } from '../types/governance';

interface Governance {
  queuedProposalsById: ProposalsById;
  dequeuedProposalsById: ProposalsById;
  allQueuedProposalIds: AllProposalIds;
  allDequeuedProposalIds: AllProposalIds;
}

const governance: Governance = {
  queuedProposalsById: {},
  dequeuedProposalsById: {},
  allQueuedProposalIds: [],
  allDequeuedProposalIds: []
};

const initialState = initialStateDecorator(governance);

const fetchProposals = (
  state,
  { queuedProposalsById, dequeuedProposalsById, allQueuedProposalIds, allDequeuedProposalIds }
) => {
  return {
    ...state,
    queuedProposalsById,
    dequeuedProposalsById,
    allQueuedProposalIds,
    allDequeuedProposalIds
  };
};

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_PROPOSALS:
      return evalActionPayload(state, action, fetchProposals);
    default:
      return state;
  }
};

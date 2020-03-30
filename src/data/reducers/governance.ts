import { FETCH_PROPOSALS } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { ProposalsById } from '../types/governance';

interface Governance {
  proposalsById: ProposalsById;
}

const governance: Governance = {
  proposalsById: {}
};

const initialState = initialStateDecorator(governance);

const fetchProposals = (state, { proposals }: ProposalsById) => {
  return {
    ...state,
    ...proposals
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

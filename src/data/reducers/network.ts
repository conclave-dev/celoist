import BigNumber from 'bignumber.js';
import { FETCH_GROUPS, FETCH_GROUP_MEMBERS, FETCH_PROPOSALS, FETCH_GROUP_DETAILS } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { Election, Proposal } from './types';

const network: Election = {
  groups: {},
  groupMembers: {},
  queuedProposals: {},
  dequeuedProposals: {},
  totalVotes: new BigNumber(0)
};

const initialState: Election = initialStateDecorator(network);

export default (state = initialState, action) => {
  const { type } = action;

  const fetchGroups = (
    state,
    { groups: { groups, totalVotes } }: { groups: Election['groups']; totalVotes: BigNumber }
  ) => ({
    ...state,
    groups,
    totalVotes
  });

  const fetchGroupMembers = (state, { groupMembers }: { groupMembers: Election['groupMembers'] }) => ({
    ...state,
    groupMembers
  });

  const fetchGroupDetails = (state, { group }) => {
    return {
      ...state,
      groups: {
        ...state.groups,
        [group.address]: {
          ...state.groups[group.address],
          ...group
        }
      }
    };
  };

  const fetchProposals = (state, { proposals }: { proposals: { [key: number]: Proposal } }) => {
    return {
      ...state,
      ...proposals
    };
  };

  switch (type) {
    case FETCH_GROUPS:
      return evalActionPayload(state, action, fetchGroups);
    case FETCH_GROUP_MEMBERS:
      return evalActionPayload(state, action, fetchGroupMembers);
    case FETCH_GROUP_DETAILS:
      return evalActionPayload(state, action, fetchGroupDetails);
    case FETCH_PROPOSALS:
      return evalActionPayload(state, action, fetchProposals);
    default:
      return state;
  }
};

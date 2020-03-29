import BigNumber from 'bignumber.js';
import { FETCH_GROUPS, FETCH_GROUP_MEMBERS, FETCH_PROPOSALS, FETCH_GROUP_DETAILS } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { Election, Proposal } from './types';

const network: Election = {
  groups: [],
  groupDetails: {},
  groupMembers: {},
  queuedProposals: {},
  dequeuedProposals: {}
};

const initialState: Election = initialStateDecorator(network);

export default (state = initialState, action) => {
  const { type } = action;

  const fetchGroups = (
    state,
    {
      groups
    }: {
      state: Election;
      groups: Election['groups'];
    }
  ) => ({
    ...state,
    groups
  });

  const fetchGroupMembers = (state, { groupMembers }: { groupMembers: Election['groupMembers'] }) => ({
    ...state,
    groupMembers
  });

  const fetchGroupDetails = (state, { groupDetails }) => {
    return {
      ...state,
      groupDetails: {
        ...state.groupDetails,
        [groupDetails.address]: {
          ...groupDetails
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

import { FETCH_ELECTION, VOTE_GROUP, REVOKE_VOTE, ACTIVATE_PENDING_VOTE } from '../actions/actions';
import { baseTxFields, initialStateDecorator, evalActionPayload } from '../util/reducers';
import { GroupsById, AllGroupIds, Config } from '../types/elections';

interface Elections {
  groupsById: GroupsById;
  allGroupIds: AllGroupIds;
  config: Config;
  summary: {
    averageScore: number;
    groupVoterRewards: any[];
  };
  tx: any;
}

interface FetchElection {
  groupsById: GroupsById;
  allGroupIds: AllGroupIds;
}

const elections: Elections = {
  groupsById: {},
  allGroupIds: [],
  config: {},
  summary: {
    averageScore: 0,
    groupVoterRewards: []
  },
  tx: {
    ...baseTxFields
  }
};

const initialState = initialStateDecorator(elections);

const fetchElection = (state, { groupsById, allGroupIds, config, summary }): FetchElection => ({
  ...state,
  groupsById,
  allGroupIds,
  config,
  summary
});

const handleTx = (state, { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash }) => ({
  ...state,
  tx: {
    blockHash,
    blockNumber,
    cumulativeGasUsed,
    gasUsed,
    transactionHash
  }
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_ELECTION:
      return evalActionPayload(state, action, fetchElection);
    case VOTE_GROUP:
    case REVOKE_VOTE:
    case ACTIVATE_PENDING_VOTE:
      return evalActionPayload(state, action, handleTx);
    default:
      return state;
  }
};

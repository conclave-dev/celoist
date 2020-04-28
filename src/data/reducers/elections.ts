import { FETCH_ELECTION } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { GroupsById, AllGroupIds, Config } from '../types/elections';

interface Elections {
  groupsById: GroupsById;
  allGroupIds: AllGroupIds;
  config: Config;
  summary: {
    averageScore: number;
    groupVoterRewards: any[];
  };
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

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_ELECTION:
      return evalActionPayload(state, action, fetchElection);
    default:
      return state;
  }
};

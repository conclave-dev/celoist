import { FETCH_ELECTION } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { GroupsById, AllGroupIds, Config } from '../types/elections';

interface Elections {
  groupsById: GroupsById;
  allGroupIds: AllGroupIds;
  config: Config;
}

interface FetchElection {
  groupsById: GroupsById;
  allGroupIds: AllGroupIds;
}

const elections: Elections = {
  groupsById: {},
  allGroupIds: [],
  config: {}
};

const initialState = initialStateDecorator(elections);

const fetchElection = (state, { groupsById, allGroupIds, config }): FetchElection => ({
  ...state,
  groupsById,
  allGroupIds,
  config
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

import { FETCH_ELECTION } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { GroupsById, AllGroupIds } from '../types/elections';

interface Elections {
  groupsById: GroupsById;
  allGroupIds: AllGroupIds;
}

interface FetchElection {
  groupsById: GroupsById;
  allGroupIds: AllGroupIds;
}

const elections: Elections = {
  groupsById: {},
  allGroupIds: []
};

const initialState = initialStateDecorator(elections);

const fetchElection = (state, { groupsById, allGroupIds }): FetchElection => ({
  ...state,
  groupsById,
  allGroupIds
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

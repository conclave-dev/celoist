import { FETCH_GROUPS, FETCH_GROUP_DETAILS } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { GroupsById, GroupDetailsById, AllGroupIds, GroupId } from '../types/elections';

interface Elections {
  groupsById: GroupsById;
  groupDetailsById: GroupDetailsById;
  allGroupIds: AllGroupIds;
  selectedGroupId: GroupId;
}

interface FetchGroups {
  groupsById: GroupsById;
  allGroupIds: GroupDetailsById;
}

interface FetchGroupDetails {
  groupDetails: AllGroupIds;
  groupId: string;
}

const elections: Elections = {
  groupsById: {},
  groupDetailsById: {},
  allGroupIds: [],
  selectedGroupId: ''
};

const initialState = initialStateDecorator(elections);

const fetchGroups = (state, { groupsById, allGroupIds }: FetchGroups) => ({
  ...state,
  groupsById,
  allGroupIds
});

const fetchGroupDetails = (state, { groupDetails, groupId }: FetchGroupDetails) => ({
  ...state,
  groupDetailsById: {
    ...state.groupDetailsById,
    [groupId]: groupDetails
  }
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case FETCH_GROUPS:
      return evalActionPayload(state, action, fetchGroups);
    case FETCH_GROUP_DETAILS:
      return evalActionPayload(state, action, fetchGroupDetails);
    default:
      return state;
  }
};

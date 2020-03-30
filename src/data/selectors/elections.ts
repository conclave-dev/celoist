import { createSelector } from 'reselect';
import BigNumber from 'bignumber.js';
import { Group, GroupsById, GroupDetailsById, AllGroupIds, GroupId } from '../types/elections';

type GetGroupsById = { elections: { groupsById: GroupsById } };
type GetAllGroupIds = { elections: { allGroupIds: AllGroupIds } };
type GetGroupDetailsById = { elections: { groupDetailsById: GroupDetailsById } };
type GetGroupDetailsByIdProps = { group: Group };
type GetSelectedGroupId = { elections: { selectedGroupId: GroupId } };
type ElectionsCreateSelector = {
  groupsById: GroupsById;
  allGroupIds: AllGroupIds;
  inProgress: boolean;
};
type GroupDetailsCreateSelector = {
  groupDetailsById: GroupDetailsById;
  selectedGroupId: string;
  inProgress: boolean;
};

const getInProgress = ({ elections: { inProgress } }) => inProgress;

const getGroupsById = ({ elections: { groupsById } }: GetGroupsById) => groupsById;

const getAllGroupIds = ({ elections: { allGroupIds } }: GetAllGroupIds) => allGroupIds;

const getGroupDetailsById = (
  { elections: { groupDetailsById } }: GetGroupDetailsById,
  props: GetGroupDetailsByIdProps
) => (props.group && props.group.address ? groupDetailsById[props.group.address] : {});

const getSelectedGroupId = ({ elections: { selectedGroupId } }: GetSelectedGroupId) => selectedGroupId;

const getGroupTotalVotes = ({ elections: { allGroupIds, groupsById } }) =>
  allGroupIds.reduce((groupTotalVotes, groupId) => groupTotalVotes.plus(groupsById[groupId].votes), new BigNumber(0));

const makeElectionsSelector = () =>
  createSelector(
    [getGroupsById, getAllGroupIds, getInProgress],
    (groupsById, allGroupIds, inProgress): ElectionsCreateSelector => ({
      groupsById,
      allGroupIds,
      inProgress
    })
  );

const makeGroupDetailsSelector = () =>
  createSelector(
    [getGroupDetailsById, getSelectedGroupId, getInProgress],
    (groupDetailsById, selectedGroupId, inProgress): GroupDetailsCreateSelector => ({
      groupDetailsById,
      selectedGroupId,
      inProgress
    })
  );

export { getGroupsById, getGroupTotalVotes, getInProgress, makeElectionsSelector, makeGroupDetailsSelector };

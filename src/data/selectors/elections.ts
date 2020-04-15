import { createSelector } from 'reselect';
import BigNumber from 'bignumber.js';
import { Group, GroupsById, GroupDetails, AllGroupIds } from '../types/elections';

type GetGroupsById = { elections: { groupsById: GroupsById } };
type GetAllGroupIds = { elections: { allGroupIds: AllGroupIds } };
type GetGroupDetailsById = { elections: { groupDetailsById: GroupDetails } };
type GetGroupDetailsByIdProps = { group: Group };
type ElectionsCreateSelector = {
  groupsById: GroupsById;
  allGroupIds: AllGroupIds;
  inProgress: boolean;
};
type GroupDetailsCreateSelector = {
  groupDetails: GroupDetails;
};

const getInProgress = ({ elections: { inProgress } }) => inProgress;

const getGroupsById = ({ elections: { groupsById } }: GetGroupsById) => groupsById;

const getAllGroupIds = ({ elections: { allGroupIds } }: GetAllGroupIds) => allGroupIds;

const getGroupDetailsById = (
  { elections: { groupDetailsById } }: GetGroupDetailsById,
  props: GetGroupDetailsByIdProps
) => props.group && props.group.address && groupDetailsById[props.group.address];

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
    [getGroupDetailsById],
    (groupDetails): GroupDetailsCreateSelector => ({
      groupDetails
    })
  );

export { getGroupsById, getGroupTotalVotes, getInProgress, makeElectionsSelector, makeGroupDetailsSelector };

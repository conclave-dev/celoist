import { createSelector } from 'reselect';
import BigNumber from 'bignumber.js';
import { GroupsById, AllGroupIds } from '../types/elections';

type GetGroupsById = { elections: { groupsById: GroupsById } };
type GetAllGroupIds = { elections: { allGroupIds: AllGroupIds } };
type ElectionsCreateSelector = {
  groupsById: GroupsById;
  allGroupIds: AllGroupIds;
  inProgress: boolean;
};

const getInProgress = ({ elections: { inProgress } }) => inProgress;

const getGroupsById = ({ elections: { groupsById } }: GetGroupsById) => groupsById;

const getAllGroupIds = ({ elections: { allGroupIds } }: GetAllGroupIds) => allGroupIds;

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

export { getGroupsById, getGroupTotalVotes, getInProgress, makeElectionsSelector };

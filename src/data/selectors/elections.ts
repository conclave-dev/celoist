import { createSelector } from 'reselect';
import { GroupsById, AllGroupIds, Config } from '../types/elections';

type GetGroupsById = { elections: { groupsById: GroupsById } };
type GetAllGroupIds = { elections: { allGroupIds: AllGroupIds } };
type GetConfig = { elections: { config: Config } };
type ElectionsCreateSelector = {
  groupsById: GroupsById;
  allGroupIds: AllGroupIds;
  config: Config;
  inProgress: boolean;
};

const getInProgress = ({ elections: { inProgress } }) => inProgress;

const getGroupsById = ({ elections: { groupsById } }: GetGroupsById) => groupsById;

const getConfig = ({ elections: { config } }: GetConfig) => config;

const getAllGroupIds = ({ elections: { allGroupIds } }: GetAllGroupIds) => allGroupIds;

const makeElectionsSelector = () =>
  createSelector(
    [getGroupsById, getAllGroupIds, getConfig, getInProgress],
    (groupsById, allGroupIds, config, inProgress): ElectionsCreateSelector => ({
      groupsById,
      allGroupIds,
      config,
      inProgress
    })
  );

export { getGroupsById, getInProgress, makeElectionsSelector };

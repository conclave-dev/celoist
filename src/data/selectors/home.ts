import { createSelector } from 'reselect';
import { getProposalsById, getInProgress as getGovernanceInProgress } from './governance';
import { BlogsById, AllBlogIds } from '../types/home';
import { ProposalsById } from '../types/governance';

type HomeCreateSelector = {
  blogsById: BlogsById;
  allBlogIds: AllBlogIds;
  proposalsById: ProposalsById;
  inProgress: boolean;
  totalSupply: number;
};

const getInProgress = (state) => state.home.inProgress || getGovernanceInProgress(state);

const getHomeData = ({ home: { blogsById, allBlogIds, totalSupply } }) => ({
  blogsById,
  allBlogIds,
  totalSupply
});

const makeHomeSelector = () =>
  createSelector(
    [getHomeData, getProposalsById, getInProgress],
    ({ blogsById, allBlogIds, totalSupply }, { proposalsById }, inProgress): HomeCreateSelector => ({
      blogsById,
      allBlogIds,
      totalSupply,
      proposalsById,
      inProgress
    })
  );

export { getHomeData, getInProgress, makeHomeSelector };

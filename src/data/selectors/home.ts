import { createSelector } from 'reselect';
import { getProposalsById, getInProgress as getGovernanceInProgress } from './governance';
import { BlogsById, AllBlogIds } from '../types/home';
import { ProposalsById } from '../types/governance';

type HomeCreateSelector = {
  blogsById: BlogsById;
  allBlogIds: AllBlogIds;
  proposalsById: ProposalsById;
  inProgress: boolean;
};

const getInProgress = (state) => state.home.inProgress || getGovernanceInProgress(state);

const getBlogs = (state) => ({
  blogsById: state.home.blogsById,
  allBlogIds: state.home.allBlogIds
});

const makeHomeSelector = () =>
  createSelector(
    [getBlogs, getProposalsById, getInProgress],
    ({ blogsById, allBlogIds }, { proposalsById }, inProgress): HomeCreateSelector => ({
      blogsById,
      allBlogIds,
      proposalsById,
      inProgress
    })
  );

export { getBlogs, getInProgress, makeHomeSelector };

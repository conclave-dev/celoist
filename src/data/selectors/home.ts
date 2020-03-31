import { createSelector } from 'reselect';
import { getProposalsById, getInProgress as getGovernanceInProgress } from './governance';
import { getGroupTotalVotes } from './elections';
import { BlogsById, AllBlogIds } from '../types/home';
import { GroupVotes } from '../types/elections';
import { ProposalsById } from '../types/governance';

type HomeCreateSelector = {
  blogsById: BlogsById;
  allBlogIds: AllBlogIds;
  proposalsById: ProposalsById;
  groupTotalVotes: GroupVotes;
  inProgress: boolean;
};

const getInProgress = state => state.home.inProgress || getGovernanceInProgress(state);

const getBlogs = state => ({
  blogsById: state.home.blogsById,
  allBlogIds: state.home.allBlogIds
});

const makeHomeSelector = () =>
  createSelector(
    [getBlogs, getProposalsById, getGroupTotalVotes, getInProgress],
    ({ blogsById, allBlogIds }, { proposalsById }, groupTotalVotes, inProgress): HomeCreateSelector => ({
      blogsById,
      allBlogIds,
      proposalsById,
      groupTotalVotes,
      inProgress
    })
  );

export { getBlogs, getInProgress, makeHomeSelector };

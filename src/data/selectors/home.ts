import { createSelector } from 'reselect';
import BigNumber from 'bignumber.js';
import { getProposals } from './network';

const getBlogs = state => ({
  blogsById: state.home.blogsById,
  allBlogIds: state.home.allBlogIds
});

const getTotalVotes = state =>
  state.network.groups.reduce((totalVotes, group) => totalVotes.plus(group.votes), new BigNumber(0));

const getHomeInProgress = state => state.home.inProgress || state.network.inProgress;

const makeHomeSelector = () =>
  createSelector(
    [getBlogs, getProposals, getTotalVotes, getHomeInProgress],
    (blogs, proposals, totalVotes, inProgress) => ({
      ...blogs,
      ...proposals,
      totalVotes,
      inProgress
    })
  );

export { getBlogs, getTotalVotes, makeHomeSelector };

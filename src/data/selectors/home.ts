import { createSelector } from 'reselect';

const getBlogs = state => ({
  blogsById: state.blogsById,
  allBlogIds: state.allBlogIds
});

export default () => createSelector([getBlogs], blogs => ({ ...blogs }));

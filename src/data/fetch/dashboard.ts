import { Promise } from 'bluebird';
import { Blog } from '../reducers/types';
import { backend } from './api';

const fetchMediumBlogs: Promise<Blog> = (blogIds: string[]) =>
  Promise.reduce(
    blogIds,
    async (blogs, blogId) => {
      const { feed, items } = await (await fetch(`${backend}/medium/${blogId}`)).json();
      const { url, title, description } = feed;

      return {
        ...blogs,
        [blogId]: {
          url,
          title,
          description,
          posts: items
        }
      };
    },
    {}
  );

export { fetchMediumBlogs };

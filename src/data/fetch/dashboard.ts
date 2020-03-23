import { Promise } from 'bluebird';
import { Blog } from '../reducers/types';
import { backend } from './api';
import { stripHTML } from '../../util/text';

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
          posts: items.map(({ title, link, pubDate, author, thumbnail, categories, description }) => ({
            title,
            link,
            pubDate,
            author,
            thumbnail,
            categories,
            excerpt: `${stripHTML(description).slice(0, 140)}...`
          }))
        }
      };
    },
    {}
  );

export { fetchMediumBlogs };

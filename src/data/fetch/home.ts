import { Promise } from 'bluebird';
import { Blog } from '../types/home';
import { backend } from './api';
import { stripHTML } from '../../util/text';
import { getWeb3Contract } from './contracts';

const fetchMediumBlogs: Promise<Blog> = (blogIds: string[]) => {
  return Promise.reduce(
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
};

const fetchTotalSupply = async () => {
  const goldToken = await getWeb3Contract('goldToken');
  const totalSupply = await goldToken.methods.totalSupply().call();

  return totalSupply;
};

fetchTotalSupply();

export { fetchMediumBlogs, fetchTotalSupply };

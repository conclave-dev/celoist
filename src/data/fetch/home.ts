import { Promise } from 'bluebird';
import { newKit } from '@celo/contractkit';
import { rpcChain } from './api';
import { Blog } from '../types/home';
import { backend } from './api';
import { stripHTML } from '../../util/text';

const kit = newKit(rpcChain);

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
  const goldToken = await kit._web3Contracts.getGoldToken();
  const totalSupply = await goldToken.methods.totalSupply().call();

  return totalSupply;
};

fetchTotalSupply();

export { fetchMediumBlogs, fetchTotalSupply };

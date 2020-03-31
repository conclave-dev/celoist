export type BlogsById = { [key: string]: Blog };
export type AllBlogIds = string[];

export interface Blog {
  url: string;
  title: string;
  description: string;
  posts: BlogPost[];
}

export interface BlogPost {
  title: string;
  link: string;
  pubDate: string;
  author: string;
  thumbnail: string;
  excerpt: string;
  categories: string[];
}

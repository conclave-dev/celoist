export interface Home {
  blogs: { [key: string]: Blog };
  blogIds: string[];
}

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

export interface Election {
  eligibleGroups: Group[];
  ineligibleGroups: Group[];
}

export interface Group {
  address: string;
  name: string;
  votes: string;
  capacity: string;
  eligible: boolean;
}

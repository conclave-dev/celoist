import { BigNumber } from 'bignumber.js';
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
  groups: Group[];
  groupDetails: { [key: string]: Group };
  groupMembers: { [key: string]: GroupMember };
  queuedProposals: { [key: number]: Proposal };
  dequeuedProposals: { [key: string]: Proposal };
}

export interface Group {
  address: string;
  name: string;
  votes: BigNumber;
  capacity: BigNumber;
  eligible: boolean;
  members: GroupMember[];
  commission: BigNumber;
}

export interface GroupMember {
  name: string;
  address: string;
  ecdsaPublicKey: string;
  blsPublicKey: string;
  affiliation: string;
  score: BigNumber;
  signer: string;
}

export interface Proposal {
  proposal: ProposalTxs[];
  metadata: ProposalMetadata;
  stage: string;
  upvotes: BigNumber;
  votes: ProposalVotes;
}

export interface ProposalTxs {
  value: string;
  to: string;
  input: string;
}

export interface ProposalMetadata {
  proposer: string;
  deposit: string;
  timestamp: string;
  transactionCount: number;
}

export interface ProposalVotes {
  Yes: BigNumber;
  No: BigNumber;
  Abstain: BigNumber;
}

import BigNumber from 'bignumber.js';

export type ProposalsById = { [key: string]: Proposal };

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

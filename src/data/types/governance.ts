import BigNumber from 'bignumber.js';

export type ProposalsByStage = { [key: number]: Proposal };
export type AllProposalStages = string[];

export interface Proposal {
  proposal: ProposalTxs[];
  parsedProposal: ParsedProposalTxs[];
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

export interface ParsedProposalTxs {
  tx: any;
  callDetails: any;
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

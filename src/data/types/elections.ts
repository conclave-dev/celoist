import { BigNumber } from 'bignumber.js';

export type GroupsById = { [key: string]: Group };
export type GroupDetailsById = { [key: string]: GroupDetails };
export type AllGroupIds = string[];
export type GroupId = string;
export type GroupTotalVotes = BigNumber;

export interface Group {
  address: string;
  name: string;
  votes: BigNumber;
  capacity: BigNumber;
}

export interface GroupDetails {
  address: string;
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

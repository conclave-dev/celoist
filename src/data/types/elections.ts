import { BigNumber } from 'bignumber.js';

export type GroupId = string;
export type GroupsById = { [key: string]: Group };
export type GroupDetailsById = { [key: string]: GroupDetails };
export type AllGroupIds = GroupId[];
export type GroupVotes = BigNumber;

export interface Group {
  address: GroupId;
  name: string;
  votes: GroupVotes;
  capacity: GroupVotes;
}

export interface GroupDetails {
  address: GroupId;
  capacity: GroupVotes;
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

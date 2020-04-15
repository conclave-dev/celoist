import { BigNumber } from 'bignumber.js';

export type GroupId = string;
export type GroupsById = { [key: string]: Group };
export type AllGroupIds = GroupId[];
export type GroupVotes = BigNumber;
export type GroupMemberId = string;

export interface Group {
  name: string;
  address: GroupId;
  commission: BigNumber;
  nextCommission: BigNumber;
  nextCommissionBlock: BigNumber;
  memberAddresses: GroupMemberId[];
  members: GroupMember[];
  lastSlashed: BigNumber;
  slashingMultiplier: BigNumber;
  votes: GroupVotes;
  capacity: GroupVotes;
  score: BigNumber;
}

export interface GroupMember {
  name: string;
  address: GroupMemberId;
  ecdsaPublicKey: string;
  blsPublicKey: string;
  score: BigNumber;
  signer: string;
}

export interface Config {
  validatorLockedGoldRequirements?: {
    value: BigNumber;
    duration: BigNumber;
  };
  groupLockedGoldRequirements?: {
    value: BigNumber;
    duration: BigNumber;
  };
  maxGroupSize?: BigNumber;
  membershipHistoryLength?: BigNumber;
  slashingMultiplierResetPeriod?: BigNumber;
}

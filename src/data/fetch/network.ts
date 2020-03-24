import { newKit } from '@celo/contractkit';
import { network } from './api';

const kit = newKit(network);

const getValidatorGroupsVotes = async () => {
  const election = await kit.contracts.getElection();
  return election.getValidatorGroupsVotes();
};

export { getValidatorGroupsVotes };

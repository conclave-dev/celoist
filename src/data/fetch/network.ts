import { newKit } from '@celo/contractkit';
import { Promise } from 'bluebird';
import { network } from './api';

const kit = newKit(network);

const getValidatorGroupsVotes = async () => {
  const election = await kit.contracts.getElection();
  return election.getValidatorGroupsVotes();
};

const getGovernanceProposals = async () => {
  const governance = await kit.contracts.getGovernance();
  const queuedProposals = await Promise.map(await governance.getQueue(), async ({ proposalID }) =>
    governance.getProposalRecord(proposalID)
  );
  const dequeuedProposals = await Promise.reduce(
    await governance.getDequeue(),
    async (acc, proposalID) => {
      const proposal = await governance.getProposalRecord(proposalID);

      if (!proposal.proposal.length) {
        return acc;
      }

      return [...acc, proposal];
    },
    []
  );

  return {
    queuedProposals,
    dequeuedProposals
  };
};

export { getValidatorGroupsVotes, getGovernanceProposals };

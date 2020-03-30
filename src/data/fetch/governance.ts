import { newKit } from '@celo/contractkit';
import { Promise } from 'bluebird';
import { chain } from './api';

const kit = newKit(chain);

const getGovernance = () => kit.contracts.getGovernance();

const getGovernanceProposals = async () => {
  const governance = await getGovernance();
  const queuedProposals = await Promise.reduce(
    await governance.getQueue(),
    async (acc, { proposalID }) => ({
      ...acc,
      [proposalID]: await governance.getProposalRecord(proposalID)
    }),
    {}
  );
  const dequeuedProposals = await Promise.reduce(
    await governance.getDequeue(),
    async (acc, proposalID) => {
      const proposal = await governance.getProposalRecord(proposalID);

      if (!proposal.proposal.length) {
        return acc;
      }

      return {
        ...acc,
        [proposalID]: proposal
      };
    },
    {}
  );

  return {
    ...queuedProposals,
    ...dequeuedProposals
  };
};

export { getGovernanceProposals };

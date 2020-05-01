import { newKit } from '@celo/contractkit';
import { Promise } from 'bluebird';
import { rpcChain } from './api';

const kit = newKit(rpcChain);

const getGovernance = () => kit.contracts.getGovernance();

const getGovernanceProposals = async () => {
  const governance = await getGovernance();

  const queuedProposalsByStage = await Promise.reduce(
    await governance.getQueue(),
    async (acc, proposal) => {
      const { proposalID } = proposal;

      return {
        ...acc,
        [proposalID]: await governance.getProposalRecord(proposalID)
      };
    },
    {}
  );

  const dequeuedProposalsByStage = await Promise.reduce(
    await governance.getDequeue(),
    async (acc, proposalID) => {
      const proposal = await governance.getProposalRecord(proposalID);
      const cloneAcc = { ...acc };

      if (!proposal.proposal.length) {
        return cloneAcc;
      }

      if (!cloneAcc[proposal.stage]) {
        cloneAcc[proposal.stage] = {
          [proposalID]: proposal
        };
      } else {
        cloneAcc[proposal.stage][proposalID] = proposal;
      }

      return cloneAcc;
    },
    {}
  );

  return {
    queuedProposalsByStage,
    dequeuedProposalsByStage,
    allQueuedProposalStages: Object.keys(queuedProposalsByStage).sort(),
    allDequeuedProposalStages: Object.keys(dequeuedProposalsByStage).sort()
  };
};

export { getGovernanceProposals };

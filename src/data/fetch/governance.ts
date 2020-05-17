import { Promise } from 'bluebird';
import { getKitContract, getBlockExplorer } from './contracts';

const getProposals = async (networkID) => {
  const governance = await getKitContract(networkID, 'governance');
  const blockExplorer = await getBlockExplorer(networkID);

  const proposalReducer = (acc, proposal, proposalID) => {
    const cloneAcc = { ...acc };

    if (!proposal.proposal.length) {
      return cloneAcc;
    }

    if (!cloneAcc[proposal.stage]) {
      cloneAcc[proposal.stage] = {
        [proposalID]: {
          ...proposal,
          parsedProposal: proposal.proposal.map((p) => blockExplorer.tryParseTx(p))
        }
      };
    } else {
      cloneAcc[proposal.stage][proposalID] = proposal;
    }

    return cloneAcc;
  };

  const queuedProposalsByStage = await Promise.reduce(
    await governance.getQueue(),
    async (acc, { proposalID }) => {
      const proposal = await governance.getProposalRecord(proposalID);
      return proposalReducer(acc, proposal, proposalID);
    },
    {}
  );

  const dequeuedProposalsByStage = await Promise.reduce(
    await governance.getDequeue(),
    async (acc, proposalID) => {
      const proposal = await governance.getProposalRecord(proposalID);
      return proposalReducer(acc, proposal, proposalID);
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

export { getProposals };

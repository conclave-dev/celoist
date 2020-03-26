import { newKit } from '@celo/contractkit';
import { Promise } from 'bluebird';
import BigNumber from 'bignumber.js';
import { network } from './api';

const kit = newKit(network);

const getElection = () => kit.contracts.getElection();

// const test = async () => (await getElection());

const getElectedGroups = async () => {
  const election = await getElection();
  const eligibleGroups = await election.getEligibleValidatorGroupsVotes();

  const { groups, totalVotes } = eligibleGroups.reduce(
    (acc, group) => {
      if (group.votes.isZero()) {
        return acc;
      }

      return {
        groups: {
          ...acc.groups,
          [group.address]: group
        },
        totalVotes: BigNumber.sum(acc.totalVotes, group.votes)
      };
    },
    {
      groups: {},
      totalVotes: new BigNumber(0)
    }
  );

  return { groups, totalVotes };
};

const getElectedGroupMembers = async () => {
  const signers = await (await getElection()).getCurrentValidatorSigners();
  const validatorsContract = await kit.contracts.getValidators();
  const validators = await Promise.reduce(
    signers,
    async (acc, signer) => {
      const { affiliation, ...validator } = await validatorsContract.getValidatorFromSigner(signer);
      const newAcc = { ...acc };

      if (affiliation) {
        if (newAcc[affiliation]) {
          newAcc[affiliation] = [...newAcc[affiliation], validator];
        } else {
          newAcc[affiliation] = [validator];
        }
      }

      return newAcc;
    },
    {}
  );

  return validators;
};

const getGovernanceProposals = async () => {
  const governance = await kit.contracts.getGovernance();
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
    queuedProposals,
    dequeuedProposals
  };
};

export { getElectedGroups, getElectedGroupMembers, getGovernanceProposals };

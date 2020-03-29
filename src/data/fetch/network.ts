import { newKit } from '@celo/contractkit';
import { Promise } from 'bluebird';
import BigNumber from 'bignumber.js';
import { network } from './api';

const kit = newKit(network);

const getElection = () => kit.contracts.getElection();
const getValidators = () => kit.contracts.getValidators();
const getGovernance = () => kit.contracts.getGovernance();

// const test = async () => (await getElection());

const getElectedGroups = async () => {
  const election = await getElection();
  const eligibleGroups = await election.getEligibleValidatorGroupsVotes();

  const { groups, totalVotes } = eligibleGroups.reduce(
    (acc, group) => {
      if (group.votes && group.votes.isZero()) {
        return acc;
      }

      return {
        groups: [...acc.groups, group],
        totalVotes: BigNumber.sum(acc.totalVotes, group.votes)
      };
    },
    {
      groups: new Array(0),
      totalVotes: new BigNumber(0)
    }
  );

  return { groups: groups.sort((a, b) => b.votes.minus(a.votes)), totalVotes };
};

const getElectedGroupDetails = async (groupAddress: string) => {
  const validators = await getValidators();
  const validatorGroup = await validators.getValidatorGroup(groupAddress, true);

  return {
    ...validatorGroup,
    members: await Promise.map(validatorGroup.members, member => validators.getValidatorFromSigner(member))
  };
};

const getElectedGroupMembers = async () => {
  const signers = await (await getElection()).getCurrentValidatorSigners();
  const validatorsContract = await kit.contracts.getValidators();
  const validators = await Promise.reduce(
    signers,
    async (acc, signer) => {
      const { affiliation, score, ...validator } = await validatorsContract.getValidatorFromSigner(signer);
      const newAcc = { ...acc };

      if (affiliation) {
        if (newAcc[affiliation]) {
          newAcc[affiliation] = {
            members: [...newAcc[affiliation].members, validator],
            memberScores: [...newAcc[affiliation].memberScores, score]
          };
        } else {
          newAcc[affiliation] = {
            members: [validator],
            memberScores: [score]
          };
        }
      }

      return newAcc;
    },
    {}
  );

  return validators;
};

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
    queuedProposals,
    dequeuedProposals
  };
};

export { getElectedGroups, getElectedGroupMembers, getElectedGroupDetails, getGovernanceProposals };

import { newKit } from '@celo/contractkit';
import { Promise } from 'bluebird';
import { network } from './api';

const kit = newKit(network);

const getElection = () => kit.contracts.getElection();
const getValidators = () => kit.contracts.getValidators();
const getGovernance = () => kit.contracts.getGovernance();

const getEligibleGroups = async () => {
  const election = await getElection();
  return election.getEligibleValidatorGroupsVotes();
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

export { getEligibleGroups, getElectedGroupMembers, getElectedGroupDetails, getGovernanceProposals };

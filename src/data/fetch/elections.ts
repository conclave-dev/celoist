import { newKit } from '@celo/contractkit';
import { Promise } from 'bluebird';
import { rpcChain, wsChain } from './api';
import { ElectionWrapper } from '@celo/contractkit/lib/wrappers/Election';
import { ValidatorsWrapper } from '@celo/contractkit/lib/wrappers/Validators';

const kit = newKit(rpcChain);
const wsKit = newKit(wsChain);

// Call setProvider to override contractkit's default HTTP provider
wsKit.web3.setProvider(wsChain);

const contracts: { election?: ElectionWrapper; validators?: ValidatorsWrapper } = {};

const getElection = async () => {
  if (!contracts.election) {
    contracts.election = await kit.contracts.getElection();
  }

  return contracts.election;
};

const getValidators = async () => {
  if (!contracts.validators) {
    contracts.validators = await kit.contracts.getValidators();
  }

  return contracts.validators;
};

const getGroups = async () => {
  const election = await getElection();

  const groups = await Promise.reduce(
    await election.getValidatorGroupsVotes(),
    async (acc, group) => ({
      groupsById: {
        ...acc.groupsById,
        [group.address]: group
      },
      allGroupIds: [...acc.allGroupIds, group.address]
    }),
    {
      groupsById: {},
      allGroupIds: new Array(0)
    }
  );

  return groups;
};

const getElectedGroupDetails = async (groupAddress: string) => {
  const validators = await getValidators();
  const validatorGroup = await validators.getValidatorGroup(groupAddress);

  return {
    ...validatorGroup,
    members: await Promise.map(validatorGroup.members, member => validators.getValidatorFromSigner(member))
  };
};

export { getGroups, getElectedGroupDetails };

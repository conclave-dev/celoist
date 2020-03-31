import { newKit } from '@celo/contractkit';
import { Promise } from 'bluebird';
import { chain } from './api';

const kit = newKit(chain);

const getElection = () => kit.contracts.getElection();
const getValidators = () => kit.contracts.getValidators();

const getEligibleGroups = async () => {
  const election = await getElection();
  return (await election.getEligibleValidatorGroupsVotes()).reduce(
    (acc, group) => ({
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
};

const getElectedGroupDetails = async (groupAddress: string) => {
  const validators = await getValidators();
  const validatorGroup = await validators.getValidatorGroup(groupAddress, true);

  return {
    ...validatorGroup,
    members: await Promise.map(validatorGroup.members, member => validators.getValidatorFromSigner(member))
  };
};

export { getEligibleGroups, getElectedGroupDetails };

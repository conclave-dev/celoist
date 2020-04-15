import { newKit } from '@celo/contractkit';
import { rpcChain } from './api';
import { backendFetch } from './util';
import BigNumber from 'bignumber.js';

const kit = newKit(rpcChain);

const populateElection = async (blockNumber?: number) => {
  const { groups, groupAddresses, groupVotes } = await backendFetch('/celo/election', {
    blockNumber: blockNumber || (await kit.web3.eth.getBlockNumber())
  });

  return groupAddresses.reduce(
    (acc, groupAddress, index) => ({
      groupsById: {
        ...acc.groupsById,
        [groupAddress]: {
          ...groups[groupAddress],
          votes: new BigNumber(groupVotes[index]),
          capacity: new BigNumber(groups[groupAddress].capacity)
        }
      },
      allGroupIds: acc.allGroupIds.concat([groupAddress])
    }),
    {
      groupsById: {},
      allGroupIds: new Array(0)
    }
  );
};

export { populateElection };

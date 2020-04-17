import { newKit } from '@celo/contractkit';
import { reduce } from 'lodash';
import { rpcChain } from './api';
import { backendFetch } from './util';
import BigNumber from 'bignumber.js';

import { setUpLedger } from './ledger';

setUpLedger();

const kit = newKit(rpcChain);

const populateElection = async (blockNumber?: number) => {
  const { groups, groupAddresses, groupVotes } = await backendFetch('/celo/election', {
    opts: { blockNumber: blockNumber || (await kit.web3.eth.getBlockNumber()) }
  });

  return groupAddresses.reduce(
    (acc, groupAddress, index) => {
      const {
        commission,
        nextCommission,
        nextCommissionBlock,
        lastSlashed,
        slashingMultiplier,
        capacity,
        members,
        memberAddresses
      } = groups[groupAddress];

      return {
        groupsById: {
          ...acc.groupsById,
          [groupAddress]: {
            ...groups[groupAddress],
            commission: new BigNumber(commission),
            nextCommission: new BigNumber(nextCommission),
            nextCommissionBlock: new BigNumber(nextCommissionBlock),
            lastSlashed: new BigNumber(lastSlashed),
            slashingMultiplier: new BigNumber(slashingMultiplier),
            votes: new BigNumber(groupVotes[index]),
            capacity: new BigNumber(capacity),
            score: reduce(members, (scoreSum, { score }) => scoreSum.plus(score), new BigNumber(0)).dividedBy(
              memberAddresses.length
            )
          }
        },
        allGroupIds: acc.allGroupIds.concat([groupAddress])
      };
    },
    {
      groupsById: {},
      allGroupIds: new Array(0)
    }
  );
};

const fetchElectionConfig = async () => {
  const validators = await kit.contracts.getValidators();
  const config = await validators.getConfig();
  return config;
};

export { populateElection, fetchElectionConfig };

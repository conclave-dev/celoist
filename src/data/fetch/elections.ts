import { newKit } from '@celo/contractkit';
import { reduce, forEach } from 'lodash';
import { rpcChain } from './api';
import { backendFetch } from './util';
import BigNumber from 'bignumber.js';

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

const fetchElectionSummary = async (groupsById) => {
  // Get cumulative score and member count for calculating average score
  const { cumulativeScore, memberCount } = reduce(
    groupsById,
    (acc, group) => {
      let newMemberCount = acc.memberCount;
      let newCumulativeScore = new BigNumber(acc.cumulativeScore);

      forEach(group.members, ({ score }) => {
        if (!score) {
          return;
        }

        newMemberCount += 1;
        newCumulativeScore = newCumulativeScore.plus(score);
      });

      return {
        memberCount: newMemberCount,
        cumulativeScore: newCumulativeScore
      };
    },
    {
      memberCount: 0,
      cumulativeScore: new BigNumber(0)
    }
  );

  // Calculate average payments and votes
  const electionWrapper = await kit.contracts.getElection();
  const epochNumber = await (await kit.contracts.getValidators()).getEpochNumber();
  const groupVoterRewards = await electionWrapper.getGroupVoterRewards(epochNumber.minus(1).toNumber());

  console.log('groupsById', Object.keys(groupsById).length);
  console.log('groupVoterRewards', groupVoterRewards.length);

  // Get cumulative rewards and votes for calculating their averages
  // Additionally, set each group's epoch reward field
  const { cumulativeRewards, cumulativeVotes, groupsByIdWithRewards } = reduce(
    groupVoterRewards,
    (acc, { group: { address }, groupVoterPayment, epochNumber }) => {
      const lowercaseAddress = address.toLowerCase();

      if (!groupsById[lowercaseAddress]) {
        console.log('NOT FOUND', address);
        return acc;
      }

      if (groupsById[lowercaseAddress].votes.isZero()) {
        console.log('ZERO group:', groupsById[lowercaseAddress]);
        console.log('payment:', groupVoterPayment);
        return acc;
      }

      const matchingGroup = {
        ...groupsById[lowercaseAddress],
        groupVoterPayment: {
          epochNumber,
          amount: groupVoterPayment
        }
      };

      return {
        cumulativeRewards: acc.cumulativeRewards.plus(groupVoterPayment),
        cumulativeVotes: acc.cumulativeVotes.plus(matchingGroup.votes),
        groupsByIdWithRewards: {
          ...acc.groupsByIdWithRewards,
          [lowercaseAddress]: matchingGroup
        }
      };
    },
    {
      cumulativeRewards: new BigNumber(0),
      cumulativeVotes: new BigNumber(0),
      groupsByIdWithRewards: { ...groupsById }
    }
  );

  const groupCount = Object.keys(groupsById).length;
  const averageRewards = cumulativeRewards.dividedBy(groupCount);
  const averageVotes = cumulativeVotes.dividedBy(groupCount);

  return {
    summary: {
      memberCount,
      cumulativeScore,
      cumulativeRewards,
      cumulativeVotes,
      averageScore: cumulativeScore / memberCount,
      averageRewards,
      averageVotes
    },
    groupsByIdWithRewards
  };
};

export { populateElection, fetchElectionConfig, fetchElectionSummary };

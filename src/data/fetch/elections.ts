import { newKit } from '@celo/contractkit';
import { Wallet } from '@celo/contractkit/lib/wallets/wallet';
import { reduce, forEach } from 'lodash';
import { rpcChain } from './api';
import { backendFetch } from './util';
import BigNumber from 'bignumber.js';
import { getKitContract, getWeb3Contract, getContractMethodCallABI } from './contracts';
import { sendTxWithLedger } from './ledger';
import { getIsRegistered } from './account';
import { tokenExchangeBase } from './network';

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
  const validators = await getKitContract('validators');
  const election = await getKitContract('election');
  const { electabilityThreshold } = await election.getConfig();
  const totalVotes = await (await getWeb3Contract('election')).methods.getTotalVotes().call();
  const thresholdDecimal = electabilityThreshold.toNumber() / new BigNumber('1e24').toNumber();
  const minimumRequiredVotes = new BigNumber(thresholdDecimal * parseInt(totalVotes));

  return {
    maxGroupSize: (await validators.getConfig()).maxGroupSize,
    minimumRequiredVotes
  };
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
  const electionWrapper = await getKitContract('election');
  const epochNumber = await (await getKitContract('validators')).getEpochNumber();
  const groupVoterRewards = await electionWrapper.getGroupVoterRewards(epochNumber.minus(1).toNumber());

  // Get cumulative rewards and votes for calculating their averages
  // Additionally, set each group's epoch reward field
  const { cumulativeRewards, cumulativeVotes, groupsByIdWithRewards } = reduce(
    groupVoterRewards,
    (acc, { group: { address }, groupVoterPayment }) => {
      const lowercaseAddress = address.toLowerCase();

      if (!groupsById[lowercaseAddress]) {
        return acc;
      }

      const matchingGroup = {
        ...groupsById[lowercaseAddress],
        groupVoterPayment: new BigNumber(groupVoterPayment)
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
      epochNumber,
      memberCount,
      cumulativeScore,
      cumulativeRewards,
      cumulativeVotes,
      averageRewards,
      averageVotes,
      averageScore: new BigNumber(cumulativeScore / memberCount)
    },
    groupsByIdWithRewards
  };
};

const voteGroup = async (amount: BigNumber, groupAddress: string, ledger: Wallet) => {
  const [account] = ledger.getAccounts();

  await getIsRegistered(account, true);

  const value = amount.multipliedBy(tokenExchangeBase).toFixed(0);
  const electionContract = await getKitContract('election');
  const voteTxABI = await getContractMethodCallABI({
    contract: electionContract,
    contractMethod: 'vote',
    contractMethodArgs: [groupAddress, value]
  });
  const txReceipt = await sendTxWithLedger({
    ledger,
    to: electionContract.address,
    data: voteTxABI
  });

  return {
    txReceipt
  };
};

const activatePendingVote = async (ledger: Wallet) => {
  const [account] = ledger.getAccounts();

  await getIsRegistered(account, true);

  const electionContract = await getKitContract('election');
  const activateTxABI = await getContractMethodCallABI({
    contract: electionContract,
    contractMethod: 'activate',
    contractMethodArgs: [account]
  });
  const txReceipt = await sendTxWithLedger({
    ledger,
    to: electionContract.address,
    data: activateTxABI
  });

  return {
    txReceipt
  };
};

const revokeVote = async (amount: BigNumber, groupAddress: string, ledger: Wallet) => {
  const [account] = ledger.getAccounts();

  await getIsRegistered(account, true);

  const value = amount.multipliedBy(tokenExchangeBase).toFixed(0);
  const electionContract = await getKitContract('election');
  const revokeTxABI = await getContractMethodCallABI({
    contract: electionContract,
    contractMethod: 'revoke',
    contractMethodArgs: [account, groupAddress, value]
  });
  const txReceipt = await sendTxWithLedger({
    ledger,
    to: electionContract.address,
    data: revokeTxABI,
    value
  });

  return {
    txReceipt
  };
};

export { populateElection, fetchElectionConfig, fetchElectionSummary, voteGroup, activatePendingVote, revokeVote };

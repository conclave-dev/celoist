import { newKit } from '@celo/contractkit';
import { Wallet } from '@celo/contractkit/lib/wallets/wallet';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { Promise } from 'bluebird';
import { rpcChain } from './api';
import { sendTxWithLedger } from './ledger';
import { getKitContract, getWeb3Contract, getContractMethodCallABI } from './contracts';
import { tokenExchangeBase } from './network';
import { getTokenAmountFromUint256 } from '../../util/numbers';

const kit = newKit(rpcChain);

const getIsRegistered = async (account: string, required: boolean) => {
  const accountContract = await getKitContract('accounts');
  const isRegistered = await accountContract.isAccount(account);

  if (!isRegistered && required) {
    throw new Error('Account must be registered first');
  }

  return isRegistered;
};

const getAssets = async (account: string) => {
  const goldTokenContract = await getKitContract('goldToken');
  const stableTokenContract = await getKitContract('stableToken');
  const lockedGoldContract = await getKitContract('lockedGold');
  const cGLD = getTokenAmountFromUint256(await goldTokenContract.balanceOf(account));
  const cUSD = getTokenAmountFromUint256(await stableTokenContract.balanceOf(account));
  const totalLockedGold = getTokenAmountFromUint256(await lockedGoldContract.getAccountTotalLockedGold(account));
  const nonVotingLockedGold = getTokenAmountFromUint256(
    await lockedGoldContract.getAccountNonvotingLockedGold(account)
  );
  const pendingWithdrawals = [];

  const isRegistered = await getIsRegistered(account, false);

  if (isRegistered) {
    // Fetch pending withdrawals only for registered account, otherwise an exception would be thrown
    const pendingList = await lockedGoldContract.getPendingWithdrawals(account);
    pendingList.forEach((withdrawal) => {
      const { value, time } = withdrawal;
      pendingWithdrawals.push({
        value: getTokenAmountFromUint256(value),
        time: moment.unix(time.toNumber()).format('MMMM Do YYYY, h:mm:ss a')
      });
    });
  }

  return {
    cGLD,
    cUSD,
    totalLockedGold,
    nonVotingLockedGold,
    pendingWithdrawals
  };
};

const getAccountSummary = async (account: string) => {
  const accountContract = await getKitContract('accounts');
  const summary = await accountContract.getAccountSummary(account);
  const assets = await getAssets(account);
  const isRegistered = await getIsRegistered(account, false);

  return {
    summary,
    assets,
    isRegistered
  };
};

const registerAccount = async (ledger: Wallet) => {
  const [account] = ledger.getAccounts();
  const accountContract = await getKitContract('accounts');

  const isRegistered = await getIsRegistered(account, false);

  if (isRegistered) {
    throw new Error('Account has been registered');
  }

  const createAccountTxABI = await getContractMethodCallABI({
    contract: accountContract,
    contractMethod: 'createAccount'
  });

  return sendTxWithLedger({
    ledger,
    to: accountContract.address,
    data: createAccountTxABI
  });
};

const getAssetExchangeApproval = async (amount: string, isSellingGold: boolean, ledger: Wallet) => {
  const exchangeContract = await getKitContract('exchange');
  const contractName = isSellingGold ? 'goldToken' : 'stableToken';
  const contract = await getKitContract(contractName);
  const approvalTxABI = await getContractMethodCallABI({
    contract: contract,
    contractMethod: 'increaseAllowance',
    contractMethodArgs: [exchangeContract.address, amount]
  });

  return sendTxWithLedger({
    ledger,
    to: contract.address,
    data: approvalTxABI
  });
};

const exchangeAssets = async (amount: BigNumber, minReceived: BigNumber, isSellingGold: boolean, ledger: Wallet) => {
  const amountUint256 = amount.multipliedBy(tokenExchangeBase).toFixed(0);

  // Set the min received amount to be at least 95% of value shown to user for safety
  // Due to exchange rate fluctuations, we cannot ensure that the minimum amount received will be 100%
  // TODO: Communicate to user that they may receive 5% less than what is estimated
  const minReceivedUint256 = minReceived.multipliedBy(tokenExchangeBase).multipliedBy('0.99').toFixed(0);

  await getAssetExchangeApproval(amountUint256, isSellingGold, ledger);

  const exchangeContract = await kit.contracts.getExchange();
  const exchangeContractMethod = isSellingGold ? 'sellGold' : 'sellDollar';
  const txABI = await getContractMethodCallABI({
    contract: exchangeContract,
    contractMethod: exchangeContractMethod,
    contractMethodArgs: [amountUint256, minReceivedUint256]
  });
  const txReceipt = await sendTxWithLedger({
    ledger,
    to: exchangeContract.address,
    data: txABI
  });

  const [account] = ledger.getAccounts();
  const assets = await getAssets(account);

  return {
    txReceipt,
    assets
  };
};

const lockGold = async (amount: BigNumber, ledger: Wallet) => {
  const [account] = ledger.getAccounts();

  await getIsRegistered(account, true);

  const value = amount.multipliedBy(tokenExchangeBase).toFixed(0);
  const lockedGoldContract = await getKitContract('lockedGold');
  const lockGoldTxABI = await getContractMethodCallABI({
    contract: lockedGoldContract,
    contractMethod: 'lock'
  });
  const txReceipt = await sendTxWithLedger({
    ledger,
    to: lockedGoldContract.address,
    data: lockGoldTxABI,
    value
  });
  const assets = await getAssets(account);

  return {
    txReceipt,
    assets
  };
};

const unlockGold = async (amount: BigNumber, ledger: Wallet) => {
  const [account] = ledger.getAccounts();

  await getIsRegistered(account, true);

  const value = amount.multipliedBy(tokenExchangeBase).toFixed(0);
  const lockedGoldContract = await getKitContract('lockedGold');
  const unlockGoldTxABI = await getContractMethodCallABI({
    contract: lockedGoldContract,
    contractMethod: 'unlock',
    contractMethodArgs: [value]
  });
  const txReceipt = await sendTxWithLedger({
    ledger,
    to: lockedGoldContract.address,
    data: unlockGoldTxABI
  });
  const assets = await getAssets(account);

  return {
    txReceipt,
    assets
  };
};

const withdrawPendingWithdrawal = async (index: number, ledger: Wallet) => {
  const [account] = ledger.getAccounts();

  await getIsRegistered(account, true);

  // `index` references the numeral index of the available pending withdrawals of the account
  const lockedGoldContract = await getKitContract('lockedGold');
  const withdrawTxABI = await getContractMethodCallABI({
    contract: lockedGoldContract,
    contractMethod: 'withdraw',
    contractMethodArgs: [index]
  });
  const txReceipt = await sendTxWithLedger({
    ledger,
    to: lockedGoldContract.address,
    data: withdrawTxABI
  });
  const assets = await getAssets(account);

  return {
    txReceipt,
    assets
  };
};

const fetchAccountEarnings = async (account: string, blockNumber?: number) => {
  const electionContract = await kit.contracts.getElection();
  const groups = await electionContract.getGroupsVotedForByAccount('0xec6c3f86bf005c1305b118e744b8aad7059d449b');
  const epochNumber = blockNumber
    ? await (await getWeb3Contract('epochRewards')).methods.getEpochNumberOfBlock(blockNumber).call()
    : await (await getKitContract('validators')).getEpochNumber();
  const groupVoterPayments = (await electionContract.getGroupVoterRewards(epochNumber.minus(1).toNumber())).reduce(
    (acc, { group, groupVoterPayment }) => ({
      ...acc,
      [group.address]: groupVoterPayment
    }),
    {}
  );

  const earningsByGroup = await Promise.reduce(
    groups,
    async (acc, groupAddress) => ({
      ...acc,
      [groupAddress]: {
        ...(await electionContract.getVotesForGroupByAccount(account, groupAddress)),
        groupTotalActiveVotes: await electionContract.getActiveVotesForGroup(groupAddress),
        groupTotalVoterPayment: groupVoterPayments[groupAddress]
      }
    }),
    {}
  );

  return {
    byGroupId: earningsByGroup,
    allGroupIds: Object.keys(earningsByGroup)
  };
};

export {
  getAccountSummary,
  registerAccount,
  getAssets,
  exchangeAssets,
  lockGold,
  unlockGold,
  withdrawPendingWithdrawal,
  fetchAccountEarnings
};

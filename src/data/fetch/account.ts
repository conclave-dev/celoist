import { Wallet } from '@celo/contractkit/lib/wallets/wallet';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { getRpcKit } from './api';
import { sendTxWithLedger } from './ledger';
import { getKitContract, getContractMethodCallABI } from './contracts';
import { tokenExchangeBase } from './network';

const getIsRegistered = async (networkID: string, account: string, required: boolean) => {
  const accountContract = await getKitContract(networkID, 'accounts');
  const isRegistered = await accountContract.isAccount(account);

  if (!isRegistered && required) {
    throw new Error('Account must be registered first');
  }

  return isRegistered;
};

const getAssets = async (networkID: string, account: string) => {
  const goldTokenContract = await getKitContract(networkID, 'goldToken');
  const stableTokenContract = await getKitContract(networkID, 'stableToken');
  const lockedGoldContract = await getKitContract(networkID, 'lockedGold');
  const cGLD = await goldTokenContract.balanceOf(account);
  const cUSD = await stableTokenContract.balanceOf(account);
  const totalLockedGold = await lockedGoldContract.getAccountTotalLockedGold(account);
  const nonVotingLockedGold = await lockedGoldContract.getAccountNonvotingLockedGold(account);
  const pendingWithdrawals = [];

  const isRegistered = await getIsRegistered(networkID, account, false);

  if (isRegistered) {
    // Fetch pending withdrawals only for registered account, otherwise an exception would be thrown
    const pendingList = await lockedGoldContract.getPendingWithdrawals(account);
    pendingList.forEach((withdrawal) => {
      const { value, time } = withdrawal;
      pendingWithdrawals.push({
        value,
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

const getAccountSummary = async (networkID: string, ledger: Wallet) => {
  const [account] = ledger.getAccounts();
  const accountContract = await getKitContract(networkID, 'accounts');
  const summary = await accountContract.getAccountSummary(account);
  const assets = await getAssets(networkID, account);

  return {
    summary,
    assets
  };
};

const registerAccount = async (networkID: string, ledger: Wallet) => {
  const [account] = ledger.getAccounts();
  const accountContract = await getKitContract(networkID, 'accounts');

  const isRegistered = await getIsRegistered(networkID, account, false);

  if (isRegistered) {
    throw new Error('Account has been registered');
  }

  const createAccountTxABI = await getContractMethodCallABI({
    contract: accountContract,
    contractMethod: 'createAccount'
  });

  return sendTxWithLedger({
    networkID,
    ledger,
    to: accountContract.address,
    data: createAccountTxABI
  });
};

const getAssetExchangeApproval = async (networkID: string, amount: string, isSellingGold: boolean, ledger: Wallet) => {
  const exchangeContract = await getKitContract(networkID, 'exchange');
  const contractName = isSellingGold ? 'goldToken' : 'stableToken';
  const contract = await getKitContract(networkID, contractName);
  const approvalTxABI = await getContractMethodCallABI({
    contract: contract,
    contractMethod: 'increaseAllowance',
    contractMethodArgs: [exchangeContract.address, amount]
  });

  return sendTxWithLedger({
    networkID,
    ledger,
    to: contract.address,
    data: approvalTxABI
  });
};

const exchangeAssets = async (
  networkID: string,
  amount: BigNumber,
  minReceived: BigNumber,
  isSellingGold: boolean,
  ledger: Wallet
) => {
  const kit = getRpcKit(networkID);
  const amountUint256 = amount.multipliedBy(tokenExchangeBase).toFixed(0);

  // Set the min received amount to be at least 95% of value shown to user for safety
  // Due to exchange rate fluctuations, we cannot ensure that the minimum amount received will be 100%
  // TODO: Communicate to user that they may receive 5% less than what is estimated
  const minReceivedUint256 = minReceived.multipliedBy(tokenExchangeBase).multipliedBy('0.99').toFixed(0);

  await getAssetExchangeApproval(networkID, amountUint256, isSellingGold, ledger);

  const exchangeContract = await kit.contracts.getExchange();
  const exchangeContractMethod = isSellingGold ? 'sellGold' : 'sellDollar';
  const txABI = await getContractMethodCallABI({
    contract: exchangeContract,
    contractMethod: exchangeContractMethod,
    contractMethodArgs: [amountUint256, minReceivedUint256]
  });
  const txReceipt = await sendTxWithLedger({
    networkID,
    ledger,
    to: exchangeContract.address,
    data: txABI
  });

  const [account] = ledger.getAccounts();
  const assets = await getAssets(networkID, account);

  return {
    txReceipt,
    assets
  };
};

const lockGold = async (networkID: string, amount: BigNumber, ledger: Wallet) => {
  const [account] = ledger.getAccounts();

  await getIsRegistered(networkID, account, true);

  const value = amount.multipliedBy(tokenExchangeBase).toFixed(0);
  const lockedGoldContract = await getKitContract(networkID, 'lockedGold');
  const lockGoldTxABI = await getContractMethodCallABI({
    contract: lockedGoldContract,
    contractMethod: 'lock'
  });
  const txReceipt = await sendTxWithLedger({
    networkID,
    ledger,
    to: lockedGoldContract.address,
    data: lockGoldTxABI,
    value
  });
  const assets = await getAssets(networkID, account);

  return {
    txReceipt,
    assets
  };
};

const unlockGold = async (networkID: string, amount: BigNumber, ledger: Wallet) => {
  const [account] = ledger.getAccounts();

  await getIsRegistered(networkID, account, true);

  const value = amount.multipliedBy(tokenExchangeBase).toFixed(0);
  const lockedGoldContract = await getKitContract(networkID, 'lockedGold');
  const unlockGoldTxABI = await getContractMethodCallABI({
    contract: lockedGoldContract,
    contractMethod: 'unlock',
    contractMethodArgs: [value]
  });
  const txReceipt = await sendTxWithLedger({
    networkID,
    ledger,
    to: lockedGoldContract.address,
    data: unlockGoldTxABI
  });
  const assets = await getAssets(networkID, account);

  return {
    txReceipt,
    assets
  };
};

const withdrawPendingWithdrawal = async (networkID: string, index: number, ledger: Wallet) => {
  const [account] = ledger.getAccounts();

  await getIsRegistered(networkID, account, true);

  // `index` references the numeral index of the available pending withdrawals of the account
  const lockedGoldContract = await getKitContract(networkID, 'lockedGold');
  const withdrawTxABI = await getContractMethodCallABI({
    contract: lockedGoldContract,
    contractMethod: 'withdraw',
    contractMethodArgs: [index]
  });
  const txReceipt = await sendTxWithLedger({
    networkID,
    ledger,
    to: lockedGoldContract.address,
    data: withdrawTxABI
  });
  const assets = await getAssets(networkID, account);

  return {
    txReceipt,
    assets
  };
};

const upvoteQueuedProposal = async (networkID: string, proposalID: BigNumber.Value, ledger: Wallet) => {
  const [account] = ledger.getAccounts();

  await getIsRegistered(networkID, account, true);

  // `index` references the numeral index of the available pending withdrawals of the account
  const governanceContract = await getKitContract(networkID, 'governance');

  const upvoteTxABI = await getContractMethodCallABI({
    contract: governanceContract,
    contractMethod: 'upvote',
    contractMethodArgs: [proposalID, account]
  });
  const txReceipt = await sendTxWithLedger({
    networkID,
    ledger,
    to: governanceContract.address,
    data: upvoteTxABI
  });

  return {
    txReceipt
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
  upvoteQueuedProposal
};

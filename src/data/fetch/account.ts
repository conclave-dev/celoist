import { newKit } from '@celo/contractkit';
import { Wallet } from '@celo/contractkit/lib/wallets/wallet';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { rpcChain } from './api';
import { sendTxWithLedger } from './ledger';
import { getKitContract, getContractMethodCallABI } from './contracts';
import { tokenExchangeBase } from './network';

const kit = newKit(rpcChain);

const isAccount = async (account: string) => {
  const accountContract = await getKitContract('accounts');
  return await accountContract.isAccount(account);
};

const getAssets = async (account: string) => {
  const goldTokenContract = await getKitContract('goldToken');
  const stableTokenContract = await getKitContract('stableToken');
  const lockedGoldContract = await getKitContract('lockedGold');
  const cGLD = await goldTokenContract.balanceOf(account);
  const cUSD = await stableTokenContract.balanceOf(account);
  const totalLockedGold = await lockedGoldContract.getAccountTotalLockedGold(account);
  const nonVotingLockedGold = await lockedGoldContract.getAccountNonvotingLockedGold(account);
  const pendingWithdrawals = [];
  const isRegistered = await isAccount(account);

  // Fetch pending withdrawals only for registered account, otherwise an exception would be thrown
  if (isRegistered) {
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

const getAccountSummary = async (address: string) => {
  if (!kit.web3.utils.isAddress(address)) {
    throw new Error('Invalid account address');
  }

  const accountContract = await getKitContract('accounts');
  const summary = await accountContract.getAccountSummary(address);
  const assets = await getAssets(address);

  return {
    summary,
    assets
  };
};

const registerAccount = async (ledger: Wallet) => {
  const [account] = ledger.getAccounts();

  if (!kit.web3.utils.isAddress(account)) {
    throw new Error('Invalid account address');
  }

  const accountContract = await getKitContract('accounts');
  const isRegistered = await isAccount(account);

  if (isRegistered) {
    throw new Error('Account has been registered');
  }

  try {
    const createAccountTxABI = await getContractMethodCallABI({
      contract: accountContract,
      contractMethod: 'createAccount'
    });

    return await sendTxWithLedger({
      ledger,
      to: accountContract.address,
      data: createAccountTxABI
    });
  } catch (err) {
    console.error('err', err);
    return err;
  }
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
  try {
    const amountUint256 = amount.multipliedBy(tokenExchangeBase).toFixed();

    // Set the min received amount to be at least 95% of value shown to user for safety
    // Due to exchange rate fluctuations, we cannot ensure that the minimum amount received will be 100%
    // TODO: Communicate to user that they may receive 5% less than what is estimated
    const minReceivedUint256 = minReceived.multipliedBy(tokenExchangeBase).multipliedBy('0.95').toFixed();

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
  } catch (err) {
    console.error('err', err);
    return err;
  }
};

const lockGold = async (amount: BigNumber, ledger: Wallet) => {
  const [account] = ledger.getAccounts();
  const isRegistered = await isAccount(account);

  if (!isRegistered) {
    throw new Error('Account must be registered first');
  }

  try {
    const value = amount.multipliedBy(tokenExchangeBase).toFixed(0);
    const lockedGoldContract = await getKitContract('lockedGold');
    const lockGoldTx = await lockedGoldContract.lock();
    const lockGoldTxABI = await lockGoldTx.txo.encodeABI();
    const txReceipt = await sendTxWithLedger({
      ledger,
      to: lockedGoldContract.address,
      data: lockGoldTxABI,
      value
    });
    const [account] = ledger.getAccounts();
    const assets = await getAssets(account);

    return {
      txReceipt,
      assets
    };
  } catch (err) {
    console.error('err', err);
    return err;
  }
};

const unlockGold = async (amount: BigNumber, ledger: Wallet) => {
  const [account] = ledger.getAccounts();
  const isRegistered = await isAccount(account);

  if (!isRegistered) {
    throw new Error('Account must be registered first');
  }

  try {
    const value = amount.multipliedBy(tokenExchangeBase).toFixed(0);
    const lockedGoldContract = await getKitContract('lockedGold');
    const unlockGoldTx = await lockedGoldContract.unlock(value);
    const unlockGoldTxABI = await unlockGoldTx.txo.encodeABI();
    const txReceipt = await sendTxWithLedger({
      ledger,
      to: lockedGoldContract.address,
      data: unlockGoldTxABI
    });
    const [account] = ledger.getAccounts();
    const assets = await getAssets(account);

    return {
      txReceipt,
      assets
    };
  } catch (err) {
    console.error('err', err);
    return err;
  }
};

const withdrawPendingWithdrawal = async (index: number, ledger: Wallet) => {
  const [account] = ledger.getAccounts();
  const isRegistered = await isAccount(account);

  if (!isRegistered) {
    throw new Error('Account must be registered first');
  }

  try {
    // `index` references the numeral index of the available pending withdrawals of the account
    const lockedGoldContract = await getKitContract('lockedGold');
    const withdrawTx = await lockedGoldContract.withdraw(index);
    const withdrawTxABI = await withdrawTx.txo.encodeABI();
    const txReceipt = await sendTxWithLedger({
      ledger,
      to: lockedGoldContract.address,
      data: withdrawTxABI
    });
    const [account] = ledger.getAccounts();
    const assets = await getAssets(account);

    return {
      txReceipt,
      assets
    };
  } catch (err) {
    console.error('err', err);
    return err;
  }
};

export {
  getAccountSummary,
  registerAccount,
  getAssets,
  exchangeAssets,
  lockGold,
  unlockGold,
  withdrawPendingWithdrawal
};

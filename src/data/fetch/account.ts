import { newKit } from '@celo/contractkit';
import { Wallet } from '@celo/contractkit/lib/wallets/wallet';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { rpcChain } from './api';
import { sendTxWithLedger } from './ledger';
import { getKitContract } from './contracts';

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
    const createAccountTx = await accountContract.createAccount();
    const createAccountTxABI = await createAccountTx.txo.encodeABI();

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
  const exchangeContract = await kit.contracts.getExchange();
  const contractName = isSellingGold ? 'goldToken' : 'stableToken';
  const contract = await getKitContract(contractName);
  const approvalTx = await contract.increaseAllowance(exchangeContract.address, amount);
  const approvalTxABI = await approvalTx.txo.encodeABI();

  return sendTxWithLedger({
    ledger,
    to: contract.address,
    data: approvalTxABI
  });
};

const sellGold = async (amount: BigNumber, minUSDAmount: BigNumber, ledger: Wallet) => {
  try {
    const exchangeBase = 1000000000000000000;
    const amountUint256 = amount.multipliedBy(exchangeBase).toFixed();

    await getAssetExchangeApproval(amountUint256, true, ledger);

    const exchangeContract = await kit.contracts.getExchange();
    const sellGoldTx = await exchangeContract.sellGold(
      amountUint256,
      0 // minUSDAmount.multipliedBy(exchangeBase).toFixed(0)
    );
    const sellGoldTxABI = await sellGoldTx.txo.encodeABI();
    const txReceipt = await sendTxWithLedger({
      ledger,
      to: exchangeContract.address,
      data: sellGoldTxABI
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

const sellDollars = async (amount: BigNumber, minGLDAmount: BigNumber, ledger: Wallet) => {
  try {
    const exchangeBase = 1000000000000000000;
    const amountUint256 = amount.multipliedBy(exchangeBase).toFixed(0);

    await getAssetExchangeApproval(amountUint256, false, ledger);

    const exchangeContract = await kit.contracts.getExchange();
    const sellDollarsTx = await exchangeContract.sellDollar(
      amountUint256,
      0 // minGLDAmount.multipliedBy(exchangeBase).toFixed()
    );

    const sellDollarsTxABI = await sellDollarsTx.txo.encodeABI();
    const txReceipt = await sendTxWithLedger({
      ledger,
      to: exchangeContract.address,
      data: sellDollarsTxABI
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
    const exchangeBase = 1000000000000000000;
    const value = amount.multipliedBy(exchangeBase).toFixed(0);
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
    const exchangeBase = 1000000000000000000;
    const value = amount.multipliedBy(exchangeBase).toFixed(0);
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
  sellGold,
  sellDollars,
  lockGold,
  unlockGold,
  withdrawPendingWithdrawal
};

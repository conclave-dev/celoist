import { newKit } from '@celo/contractkit';
import { Wallet } from '@celo/contractkit/lib/wallets/wallet';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { newLedgerWalletWithSetup } from '@celo/contractkit/lib/wallets/ledger-wallet';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import BigNumber from 'bignumber.js';
import { rpcChain } from './api';
import { getGasConfig, generateLedgerTxData } from './util';

const derivationPathBase = "44'/52752'/0'";
const kit = newKit(rpcChain);
const contracts: {
  accounts: any;
  exchange: any;
} = {
  accounts: {},
  exchange: {}
};

const getAccountsContract = async () => {
  if (!isEmpty(contracts.accounts)) {
    return contracts.accounts;
  }

  return kit.contracts.getAccounts();
};

const setUpLedger = async (derivationPathIndex: number) => {
  const transport = await TransportU2F.create();

  transport.exchangeTimeout = 60000;
  transport.unresponsiveTimeout = 10000;

  return newLedgerWalletWithSetup(transport, [derivationPathIndex], derivationPathBase);
};

const getAssets = async (account: string) => {
  const accountContract = await getAccountsContract();
  const goldTokenContract = await kit.contracts.getGoldToken();
  const stableTokenContract = await kit.contracts.getStableToken();
  const lockedGoldContract = await kit.contracts.getLockedGold();

  const isRegistered = await accountContract.isAccount(account);
  const cGLD = await goldTokenContract.balanceOf(account);
  const cUSD = await stableTokenContract.balanceOf(account);

  const totalLockedGold = await lockedGoldContract.getAccountTotalLockedGold(account);
  const nonVotingLockedGold = await lockedGoldContract.getAccountNonvotingLockedGold(account);
  const pendingWithdrawals = [];

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

  const accountContract = await getAccountsContract();
  const summary = await accountContract.getAccountSummary(address);
  const isRegistered = await accountContract.isAccount(address);
  const assets = await getAssets(address);

  return {
    summary,
    isRegistered,
    assets
  };
};

const sellGold = async (amount: BigNumber, minUSDAmount: BigNumber, ledger: Wallet) => {
  const approveSellGold = async (amountUint256: string, ledger) => {
    const exchangeContract = await kit.contracts.getExchange();
    const goldTokenContract = await kit.contracts.getGoldToken();
    const approvalTx = await goldTokenContract.increaseAllowance(exchangeContract.address, amountUint256);
    const approvalTxABI = await approvalTx.txo.encodeABI();

    const chainId = await kit.web3.eth.getChainId();
    const ledgerTxData = await generateLedgerTxData(kit, ledger);
    const tx = await getGasConfig(kit, {
      ...ledgerTxData,
      to: goldTokenContract.address,
      data: approvalTxABI,
      gasPrice: 0,
      gas: 20000000,
      gatewayFee: `0x${(20000).toString(16)}`,
      chainId
    });

    const receipt = await kit.web3.eth.sendSignedTransaction((await ledger.signTransaction(tx)).raw);

    return receipt;
  };

  try {
    const exchangeBase = 1000000000000000000;
    const amountUint256 = amount.multipliedBy(exchangeBase).toFixed();

    await approveSellGold(amountUint256, ledger);

    const exchangeContract = await kit.contracts.getExchange();
    const sellGoldTx = await exchangeContract.sellGold(
      amountUint256,
      0 // minUSDAmount.multipliedBy(exchangeBase).toFixed(0)
    );
    const sellGoldTxABI = await sellGoldTx.txo.encodeABI();
    const chainId = await kit.web3.eth.getChainId();
    const ledgerTxData = await generateLedgerTxData(kit, ledger);
    const tx = await getGasConfig(kit, {
      ...ledgerTxData,
      to: exchangeContract.address,
      data: sellGoldTxABI,
      gasPrice: 0,
      gas: 20000000,
      gatewayFee: `0x${(20000).toString(16)}`,
      chainId
    });

    const txReceipt = await kit.web3.eth.sendSignedTransaction((await ledger.signTransaction(tx)).raw);
    const assets = await getAssets(ledger.getAccounts()[0]);

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
  const approveSellDollars = async (amountUint256: string, ledger) => {
    const exchangeContract = await kit.contracts.getExchange();
    const stableTokenContract = await kit.contracts.getStableToken();
    const approvalTx = await stableTokenContract.increaseAllowance(exchangeContract.address, amountUint256);
    const approvalTxABI = await approvalTx.txo.encodeABI();
    const chainId = await kit.web3.eth.getChainId();
    const ledgerTxData = await generateLedgerTxData(kit, ledger);

    const tx = await getGasConfig(kit, {
      ...ledgerTxData,
      to: stableTokenContract.address,
      data: approvalTxABI,
      gasPrice: 0,
      gas: 20000000,
      gatewayFee: `0x${(20000).toString(16)}`,
      chainId
    });

    const receipt = await kit.web3.eth.sendSignedTransaction((await ledger.signTransaction(tx)).raw);

    return receipt;
  };

  try {
    const exchangeBase = 1000000000000000000;
    const amountUint256 = amount.multipliedBy(exchangeBase).toFixed(0);

    await approveSellDollars(amountUint256, ledger);

    const exchangeContract = await kit.contracts.getExchange();
    const sellDollarsTx = await exchangeContract.sellDollar(
      amountUint256,
      0 // minGLDAmount.multipliedBy(exchangeBase).toFixed()
    );

    const sellDollarsTxABI = await sellDollarsTx.txo.encodeABI();
    const chainId = await kit.web3.eth.getChainId();
    const ledgerTxData = await generateLedgerTxData(kit, ledger);
    const tx = await getGasConfig(kit, {
      ...ledgerTxData,
      to: exchangeContract.address,
      data: sellDollarsTxABI,
      gasPrice: 0,
      gas: 20000000,
      gatewayFee: `0x${(20000).toString(16)}`,
      chainId
    });

    const txReceipt = await kit.web3.eth.sendSignedTransaction((await ledger.signTransaction(tx)).raw);
    const assets = await getAssets(ledger.getAccounts()[0]);

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
  try {
    const exchangeBase = 1000000000000000000;
    const amountUint256 = amount.multipliedBy(exchangeBase).toFixed(0);

    const lockedGoldContract = await kit.contracts.getLockedGold();
    const lockGoldTx = await lockedGoldContract.lock();

    const lockGoldTxABI = await lockGoldTx.txo.encodeABI();
    const chainId = await kit.web3.eth.getChainId();
    const ledgerTxData = await generateLedgerTxData(kit, ledger);
    const tx = await getGasConfig(kit, {
      ...ledgerTxData,
      to: lockedGoldContract.address,
      data: lockGoldTxABI,
      value: amountUint256, // amount of gold to be locked must be specified as `value` param of the tx obj
      gasPrice: 0,
      gas: 20000000,
      gatewayFee: `0x${(20000).toString(16)}`,
      chainId
    });

    const txReceipt = await kit.web3.eth.sendSignedTransaction((await ledger.signTransaction(tx)).raw);
    const assets = await getAssets(ledger.getAccounts()[0]);

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
  try {
    const exchangeBase = 1000000000000000000;
    const amountUint256 = amount.multipliedBy(exchangeBase).toFixed(0);

    const lockedGoldContract = await kit.contracts.getLockedGold();
    const unlockGoldTx = await lockedGoldContract.unlock(amountUint256);

    const unlockGoldTxABI = await unlockGoldTx.txo.encodeABI();
    const chainId = await kit.web3.eth.getChainId();
    const ledgerTxData = await generateLedgerTxData(kit, ledger);
    const tx = await getGasConfig(kit, {
      ...ledgerTxData,
      to: lockedGoldContract.address,
      data: unlockGoldTxABI,
      gasPrice: 0,
      gas: 20000000,
      gatewayFee: `0x${(20000).toString(16)}`,
      chainId
    });

    const txReceipt = await kit.web3.eth.sendSignedTransaction((await ledger.signTransaction(tx)).raw);
    const assets = await getAssets(ledger.getAccounts()[0]);

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
  try {
    // `index` references the numeral index of the available pending withdrawals of the account
    const lockedGoldContract = await kit.contracts.getLockedGold();
    const withdrawTx = await lockedGoldContract.withdraw(index);

    const withdrawTxABI = await withdrawTx.txo.encodeABI();
    const chainId = await kit.web3.eth.getChainId();
    const ledgerTxData = await generateLedgerTxData(kit, ledger);
    const tx = await getGasConfig(kit, {
      ...ledgerTxData,
      to: lockedGoldContract.address,
      data: withdrawTxABI,
      gasPrice: 0,
      gas: 20000000,
      gatewayFee: `0x${(20000).toString(16)}`,
      chainId
    });

    const txReceipt = await kit.web3.eth.sendSignedTransaction((await ledger.signTransaction(tx)).raw);
    const assets = await getAssets(ledger.getAccounts()[0]);

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
  setUpLedger,
  getAccountSummary,
  getAssets,
  sellGold,
  sellDollars,
  lockGold,
  unlockGold,
  withdrawPendingWithdrawal
};

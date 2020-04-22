import { newKit } from '@celo/contractkit';
import { Wallet } from '@celo/contractkit/lib/wallets/wallet';
import { isEmpty } from 'lodash';
import { newLedgerWalletWithSetup } from '@celo/contractkit/lib/wallets/ledger-wallet';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import BigNumber from 'bignumber.js';
import { rpcChain } from './api';
import { getGasConfig } from './util';

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

const getExchangeContract = async () => {
  if (!isEmpty(contracts.exchange)) {
    return contracts.exchange;
  }

  return kit.contracts.getExchange();
};

const setUpLedger = async (derivationPathIndex: number) => {
  const transport = await TransportU2F.create();

  transport.exchangeTimeout = 60000;
  transport.unresponsiveTimeout = 10000;

  return newLedgerWalletWithSetup(transport, [derivationPathIndex], derivationPathBase);
};

const getAccountSummary = async (account: string) => {
  const accountContract = await getAccountsContract();
  return accountContract.getAccountSummary(account);
};

const getAssets = async (account: string) => {
  const goldTokenContract = await kit.contracts.getGoldToken();
  const stableTokenContract = await kit.contracts.getStableToken();
  const cGLD = await goldTokenContract.balanceOf(account);
  const cUSD = await stableTokenContract.balanceOf(account);

  return {
    cGLD,
    cUSD
  };
};


const getExchangeRates = async () => {
  const exchangeBase = 1000000000000000000;
  const exchangeContract = await getExchangeContract();
  const dollarsToGold = await exchangeContract.getGoldExchangeRate(exchangeBase);
  const goldToDollars = await exchangeContract.getUsdExchangeRate(exchangeBase);

  return { dollarsToGold, goldToDollars };
};

const generateLedgerTxData = async (ledger: Wallet) => {
  const [account] = ledger.getAccounts();
  const nonce = await kit.web3.eth.getTransactionCount(account);

  return {
    from: account,
    nonce
  };
};

const sellGold = async (amount: number, minUSDAmount: number, ledger: Wallet) => {
  const exchangeContract = await kit.contracts.getExchange();
  const sellGoldTxABI = await (
    await exchangeContract.sellGold(new BigNumber(amount), new BigNumber(minUSDAmount))
  ).txo.encodeABI();
  const chainId = await kit.web3.eth.getChainId();
  const tx = getGasConfig(kit, {
    ...(await generateLedgerTxData(ledger)),
    data: sellGoldTxABI,
    gatewayFee: `0x${(20000).toString(16)}`,
    chainId
  });

  return kit.web3.eth.sendSignedTransaction((await ledger.signTransaction(tx)).raw);
};

const sellDollars = async (amount: number, minGoldAmount: number, ledger: Wallet) => {
  const exchangeContract = await kit.contracts.getExchange();
  const sellDollarsTxABI = await (
    await exchangeContract.sellDollar(new BigNumber(amount), new BigNumber(minGoldAmount))
  ).txo.encodeABI();
  const chainId = await kit.web3.eth.getChainId();
  const tx = getGasConfig(kit, {
    ...(await generateLedgerTxData(ledger)),
    data: sellDollarsTxABI,
    gatewayFee: `0x${(20000).toString(16)}`,
    chainId
  });

  return kit.web3.eth.sendSignedTransaction((await ledger.signTransaction(tx)).raw);
};

// const test = async () => {
//   const rates = await getExchangeRates();

//   console.log('gold', rates.dollarsToGold.toFixed(10));
//   console.log('usd', rates.goldToDollars.toFixed(10));
// };

// test();

export { setUpLedger, getAccountSummary, getAssets, getExchangeRates, sellGold, sellDollars };

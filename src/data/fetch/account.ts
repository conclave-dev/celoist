import { newKit } from '@celo/contractkit';
import { Wallet } from '@celo/contractkit/lib/wallets/wallet';
import { isEmpty } from 'lodash';
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

const sellGold = async (amount: number, minUSDAmount: number, ledger: Wallet) => {
  try {
    const exchangeBase = 1000000000000000000;
    const exchangeContract = await kit.contracts.getExchange();
    const sellGoldTx = await exchangeContract.sellGold(
      new BigNumber(amount).multipliedBy(exchangeBase),
      new BigNumber(minUSDAmount).multipliedBy(exchangeBase)
    );

      console.log('sellGoldTx', sellGoldTx);

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

    return kit.web3.eth.sendSignedTransaction((await ledger.signTransaction(tx)).raw);
  } catch (err) {
    console.error('err', err);
    return err;
  }
};

const sellDollars = async (amount: number, minGoldAmount: number, ledger: Wallet) => {
  try {
    const exchangeBase = 1000000000000000000;
    const exchangeContract = await kit.contracts.getExchange();
    const sellDollarsTx = await exchangeContract.sellDollar(
      new BigNumber(amount).multipliedBy(exchangeBase),
      new BigNumber(minGoldAmount).multipliedBy(exchangeBase)
    );

    console.log('amount', amount);
    console.log('minGoldAmount', minGoldAmount);
    console.log('sellDollarsTx', sellDollarsTx);

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

    return kit.web3.eth.sendSignedTransaction((await ledger.signTransaction(tx)).raw);
  } catch (err) {
    console.error('err', err);
    return err;
  }
};

export { setUpLedger, getAccountSummary, getAssets, sellGold, sellDollars };

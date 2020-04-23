import { newKit } from '@celo/contractkit';
import { isEmpty } from 'lodash';
import BigNumber from 'bignumber.js';
import { rpcChain } from './api';

const kit = newKit(rpcChain);
const contracts: {
  exchange: any;
} = {
  exchange: {}
};

const getExchangeContract = async () => {
  if (!isEmpty(contracts.exchange)) {
    return contracts.exchange;
  }

  return kit.contracts.getExchange();
};

const fetchExchangeRates = async () => {
  try {
    const exchangeBase = '1000000000000000000';
    const exchangeContract = await kit._web3Contracts.getExchange();

    const goldToDollars = new BigNumber(
      await (await exchangeContract.methods.getBuyTokenAmount(exchangeBase, true)).call()
    );
    const dollarsToGold = new BigNumber(
      await (await exchangeContract.methods.getBuyTokenAmount(exchangeBase, false)).call()
    );

    return { dollarsToGold, goldToDollars };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { fetchExchangeRates };

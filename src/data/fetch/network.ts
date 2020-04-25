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

    // Amount of cUSD received for 1 cGLD
    const dollarBuyAmount = new BigNumber(
      await (await exchangeContract.methods.getBuyTokenAmount(exchangeBase, true)).call()
    );

    // Amount of cGLD received for 1 cUSD
    const goldBuyAmount = new BigNumber(
      await (await exchangeContract.methods.getBuyTokenAmount(exchangeBase, false)).call()
    );

    const goldToDollars = new BigNumber(dollarBuyAmount.toNumber() / parseInt(exchangeBase));
    const dollarsToGold = new BigNumber(goldBuyAmount.toNumber() / parseInt(exchangeBase));

    return { dollarsToGold, goldToDollars };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { fetchExchangeRates };

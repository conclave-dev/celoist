import BigNumber from 'bignumber.js';
import { getWeb3Contract } from './contracts';

const fetchExchangeRates = async () => {
  try {
    const exchangeBase = '1000000000000000000';
    const exchangeContract = await getWeb3Contract('exchange');

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

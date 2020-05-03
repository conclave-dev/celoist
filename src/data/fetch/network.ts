import BigNumber from 'bignumber.js';
import { getWeb3Contract } from './contracts';

const tokenExchangeBase = '1e18';

const fetchExchangeRates = async () => {
  try {
    const exchangeContract = await getWeb3Contract('exchange');

    // Amount of cUSD received for 1 cGLD
    const dollarBuyAmount = new BigNumber(
      await (await exchangeContract.methods.getBuyTokenAmount(tokenExchangeBase, true)).call()
    );

    // Amount of cGLD received for 1 cUSD
    const goldBuyAmount = new BigNumber(
      await (await exchangeContract.methods.getBuyTokenAmount(tokenExchangeBase, false)).call()
    );

    const goldToDollars = new BigNumber(dollarBuyAmount.toNumber() / parseInt(tokenExchangeBase));
    const dollarsToGold = new BigNumber(goldBuyAmount.toNumber() / parseInt(tokenExchangeBase));

    return { dollarsToGold, goldToDollars };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { fetchExchangeRates, tokenExchangeBase };

import BigNumber from 'bignumber.js';
import { getKitContract, getWeb3Contract } from './contracts';

const tokenExchangeBase = new BigNumber('1e18');

const fetchExchangeRates = async () => {
  try {
    const exchangeContract = await getWeb3Contract('exchange');

    // Amount of cUSD received for 1 cGLD
    const dollarBuyAmount = new BigNumber(
      await (await exchangeContract.methods.getBuyTokenAmount(tokenExchangeBase.toFixed(0), true)).call()
    );

    // Amount of cGLD received for 1 cUSD
    const goldBuyAmount = new BigNumber(
      await (await exchangeContract.methods.getBuyTokenAmount(tokenExchangeBase.toFixed(0), false)).call()
    );

    const goldToDollars = new BigNumber(dollarBuyAmount.toNumber() / tokenExchangeBase.toNumber());
    const dollarsToGold = new BigNumber(goldBuyAmount.toNumber() / tokenExchangeBase.toNumber());

    return { dollarsToGold, goldToDollars };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const getEpochs = async (numberOfEpochs: number) => {
  const validatorsContract = await getKitContract('validators');
  const epochSize = (await validatorsContract.getEpochSize()).toNumber();
  const currentEpochNumber = (await validatorsContract.getEpochNumber()).minus(1).toNumber();
  const epochs = [];

  for (let i = currentEpochNumber; i > currentEpochNumber - numberOfEpochs; i -= 1) {
    epochs.push({
      epochNumber: i,
      firstBlockNumber: i * epochSize,
      lastBlockNumber: (i + 1) * epochSize - 1
    });
  }

  return epochs;
};

export { fetchExchangeRates, tokenExchangeBase, getEpochs };

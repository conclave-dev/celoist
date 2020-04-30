import {
  LOG_IN_LEDGER,
  LOG_OUT_LEDGER,
  GET_ACCOUNT_DATA,
  EXCHANGE_GOLD_FOR_DOLLARS,
  EXCHANGE_DOLLARS_FOR_GOLD,
  RESET_EXCHANGE_TX
} from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { setUpLedger, getAccountSummary, sellGold, sellDollars } from '../fetch/account';

const logInLedger = (accountIndex = 0) => async (dispatch) => {
  handleInit(dispatch, LOG_IN_LEDGER);

  try {
    const ledger = await setUpLedger(accountIndex);
    return handleData(dispatch, LOG_IN_LEDGER, { ledger });
  } catch (err) {
    return handleError(dispatch, LOG_IN_LEDGER, err);
  }
};

const logOutLedger = () => async (dispatch, getState) => {
  handleInit(dispatch, LOG_OUT_LEDGER);

  try {
    const {
      ledger: { ledger }
    } = getState().account;

    await ledger.transport.close();

    return handleData(dispatch, LOG_OUT_LEDGER, { ledger: {} });
  } catch (err) {
    return handleError(dispatch, LOG_OUT_LEDGER, err);
  }
};

const getAccountData = (address: string) => async (dispatch) => {
  handleInit(dispatch, GET_ACCOUNT_DATA);

  try {
    const { summary, assets } = await getAccountSummary(address);
    return handleData(dispatch, GET_ACCOUNT_DATA, { summary, assets });
  } catch (err) {
    return handleError(dispatch, GET_ACCOUNT_DATA, err);
  }
};

const exchangeGoldForDollars = (amount, minUSDAmount) => async (dispatch, getState) => {
  handleInit(dispatch, EXCHANGE_GOLD_FOR_DOLLARS);

  try {
    const { ledger } = getState().account;
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash },
      assets
    } = await sellGold(amount, minUSDAmount, ledger);

    return handleData(dispatch, EXCHANGE_GOLD_FOR_DOLLARS, {
      exchanged: amount,
      received: minUSDAmount,
      blockHash,
      blockNumber,
      cumulativeGasUsed,
      gasUsed,
      transactionHash,
      assets
    });
  } catch (err) {
    return handleError(dispatch, EXCHANGE_GOLD_FOR_DOLLARS, err);
  }
};

const exchangeDollarsForGold = (amount, minGoldAmount) => async (dispatch, getState) => {
  handleInit(dispatch, EXCHANGE_DOLLARS_FOR_GOLD);

  try {
    const { ledger } = getState().account;
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash },
      assets
    } = await sellDollars(amount, minGoldAmount, ledger);

    return handleData(dispatch, EXCHANGE_DOLLARS_FOR_GOLD, {
      exchanged: amount,
      received: minGoldAmount,
      blockHash,
      blockNumber,
      cumulativeGasUsed,
      gasUsed,
      transactionHash,
      assets
    });
  } catch (err) {
    return handleError(dispatch, EXCHANGE_DOLLARS_FOR_GOLD, err);
  }
};

const resetExchangeTx = () => async (dispatch) => handleData(dispatch, RESET_EXCHANGE_TX, {});

export { logInLedger, logOutLedger, getAccountData, exchangeGoldForDollars, exchangeDollarsForGold, resetExchangeTx };

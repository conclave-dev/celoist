import {
  CONNECT_LEDGER,
  DISCONNECT_LEDGER,
  SET_ACCOUNT,
  EXCHANGE_GOLD_FOR_DOLLARS,
  EXCHANGE_DOLLARS_FOR_GOLD,
  RESET_EXCHANGE_TX
} from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { setUpLedger, getAccountSummary, getAssets, sellGold, sellDollars } from '../fetch/account';

const connectLedger = (accountIndex: number = 0) => async dispatch => {
  handleInit(dispatch, CONNECT_LEDGER);

  try {
    const ledger = await setUpLedger(accountIndex);
    return handleData(dispatch, CONNECT_LEDGER, { ledger });
  } catch (err) {
    return handleError(dispatch, CONNECT_LEDGER, err);
  }
};

const disconnectLedger = () => async (dispatch, getState) => {
  handleInit(dispatch, DISCONNECT_LEDGER);

  try {
    const {
      ledger: { ledger }
    } = getState().account;

    await ledger.transport.close();

    return handleData(dispatch, DISCONNECT_LEDGER, { ledger: {} });
  } catch (err) {
    return handleError(dispatch, DISCONNECT_LEDGER, err);
  }
};

const setAccount = (address: string) => async dispatch => {
  handleInit(dispatch, SET_ACCOUNT);

  try {
    const account = await getAccountSummary(address);
    return handleData(dispatch, SET_ACCOUNT, { ...account });
  } catch (err) {
    return handleError(dispatch, SET_ACCOUNT, err);
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

const resetExchangeTx = () => async dispatch => handleData(dispatch, RESET_EXCHANGE_TX, {});

export { connectLedger, disconnectLedger, setAccount, exchangeGoldForDollars, exchangeDollarsForGold, resetExchangeTx };

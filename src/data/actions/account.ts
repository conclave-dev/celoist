import { isEmpty } from 'lodash';
import {
  CONNECT_LEDGER,
  DISCONNECT_LEDGER,
  SET_ACCOUNT,
  GET_ACCOUNT_ASSETS,
  EXCHANGE_GOLD_FOR_DOLLARS,
  EXCHANGE_DOLLARS_FOR_GOLD
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

const getAccountAssets = (account: string) => async dispatch => {
  handleInit(dispatch, GET_ACCOUNT_ASSETS);

  try {
    const { cGLD, cUSD } = await getAssets(account);
    return handleData(dispatch, GET_ACCOUNT_ASSETS, { cGLD, cUSD });
  } catch (err) {
    return handleError(dispatch, GET_ACCOUNT_ASSETS, err);
  }
};

const exchangeGoldForDollars = (amount, minUSDAmount) => async (dispatch, getState) => {
  handleInit(dispatch, EXCHANGE_GOLD_FOR_DOLLARS);

  try {
    const { ledger } = getState().account;
    await sellGold(amount, minUSDAmount, ledger);
    return handleData(dispatch, EXCHANGE_GOLD_FOR_DOLLARS, { sold: amount, received: minUSDAmount });
  } catch (err) {
    return handleError(dispatch, EXCHANGE_GOLD_FOR_DOLLARS, err);
  }
};

const exchangeDollarsForGold = (amount, minGoldAmount) => async (dispatch, getState) => {
  handleInit(dispatch, EXCHANGE_DOLLARS_FOR_GOLD);

  try {
    const { ledger } = getState().account;
    await sellDollars(amount, minGoldAmount, ledger);
    return handleData(dispatch, EXCHANGE_DOLLARS_FOR_GOLD, { sold: amount, received: minGoldAmount });
  } catch (err) {
    return handleError(dispatch, EXCHANGE_DOLLARS_FOR_GOLD, err);
  }
};

export {
  connectLedger,
  disconnectLedger,
  setAccount,
  getAccountAssets,
  exchangeGoldForDollars,
  exchangeDollarsForGold
};

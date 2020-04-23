import { GET_EXCHANGE_RATES, REMOVE_EXCHANGE_RATES } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { fetchExchangeRates } from '../fetch/network';

const getExchangeRates = () => async dispatch => {
  handleInit(dispatch, GET_EXCHANGE_RATES);

  try {
    const { dollarsToGold, goldToDollars } = await fetchExchangeRates();
    return handleData(dispatch, GET_EXCHANGE_RATES, { dollarsToGold, goldToDollars });
  } catch (err) {
    return handleError(dispatch, GET_EXCHANGE_RATES, err);
  }
};

const removeExchangeRates = () => async dispatch => {
  handleInit(dispatch, REMOVE_EXCHANGE_RATES);

  try {
    return handleData(dispatch, REMOVE_EXCHANGE_RATES, {});
  } catch (err) {
    return handleError(dispatch, REMOVE_EXCHANGE_RATES, err);
  }
};

export { getExchangeRates, removeExchangeRates };

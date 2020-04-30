import { GET_EXCHANGE_RATES, REMOVE_EXCHANGE_RATES } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import BigNumber from 'bignumber.js';

const accountState = {
  exchangeRates: {
    goldToDollars: new BigNumber(0),
    dollarsToGold: new BigNumber(0)
  }
};

const initialState = initialStateDecorator(accountState);

const getExchangeRates = (state, { goldToDollars, dollarsToGold }) => ({
  ...state,
  exchangeRates: {
    goldToDollars,
    dollarsToGold
  }
});

const removeExchangeRates = (state) => ({
  ...state,
  exchangeRates: {
    goldToDollars: new BigNumber(0),
    dollarsToGold: new BigNumber(0)
  }
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case GET_EXCHANGE_RATES:
      return evalActionPayload(state, action, getExchangeRates);
    case REMOVE_EXCHANGE_RATES:
      return evalActionPayload(state, action, removeExchangeRates);
    default:
      return state;
  }
};

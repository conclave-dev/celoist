import { GET_EXCHANGE_RATES, REMOVE_EXCHANGE_RATES, SWITCH_NETWORK } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { defaultNetworkID } from '../fetch/api';
import BigNumber from 'bignumber.js';

const networkState = {
  networkID: defaultNetworkID,
  exchangeRates: {
    goldToDollars: new BigNumber(0),
    dollarsToGold: new BigNumber(0)
  }
};

const initialState = initialStateDecorator(networkState);

const switchNetwork = (state, { networkID }) => ({
  ...state,
  networkID
});

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
    case SWITCH_NETWORK:
      return evalActionPayload(state, action, switchNetwork);
    default:
      return state;
  }
};

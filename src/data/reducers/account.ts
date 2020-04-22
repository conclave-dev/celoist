import { CONNECT_LEDGER, DISCONNECT_LEDGER, SET_ACCOUNT, GET_ACCOUNT_ASSETS } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import BigNumber from 'bignumber.js';

const accountState = {
  ledger: {},
  address: '',
  name: '',
  authorizedSigners: {},
  metadataURL: '',
  wallet: '',
  dataEncryptionKey: '',
  assets: {
    cGLD: new BigNumber(0),
    cUSD: new BigNumber(0)
  }
};

const initialState = initialStateDecorator(accountState);

const connectLedger = (state, { ledger }) => ({
  ...state,
  ledger
});

const disconnectLedger = (state, { ledger }) => ({
  ...state,
  ledger
});

const setAccount = (state, { address, name, authorizedSigners, metadataURL, wallet, dataEncryptionKey }) => ({
  ...state,
  address,
  name,
  authorizedSigners,
  metadataURL,
  wallet,
  dataEncryptionKey
});

const getAccountAssets = (state, { cGLD, cUSD }) => ({
  ...state,
  assets: {
    cGLD,
    cUSD
  }
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case CONNECT_LEDGER:
      return evalActionPayload(state, action, connectLedger);
    case DISCONNECT_LEDGER:
      return evalActionPayload(state, action, disconnectLedger);
    case SET_ACCOUNT:
      return evalActionPayload(state, action, setAccount);
    case GET_ACCOUNT_ASSETS:
      return evalActionPayload(state, action, getAccountAssets);
    default:
      return state;
  }
};

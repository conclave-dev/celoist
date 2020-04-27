import { CONNECT_LEDGER, DISCONNECT_LEDGER, SET_ACCOUNT } from '../actions/actions';
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
  ledger,
  address: ledger.getAccounts()[0]
});

const disconnectLedger = state => state;

const setAccount = (state, { address, name, authorizedSigners, metadataURL, wallet, dataEncryptionKey, assets }) => ({
  ...state,
  address,
  name,
  authorizedSigners,
  metadataURL,
  wallet,
  dataEncryptionKey,
  assets
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
    default:
      return state;
  }
};

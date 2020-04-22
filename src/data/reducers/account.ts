import { CONNECT_LEDGER, DISCONNECT_LEDGER, SET_ACCOUNT } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';

const accountState = {
  ledger: {},
  address: '',
  name: '',
  authorizedSigners: {},
  metadataURL: '',
  wallet: '',
  dataEncryptionKey: ''
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

import {
  CONNECT_LEDGER,
  DISCONNECT_LEDGER,
  SET_ACCOUNT,
  EXCHANGE_GOLD_FOR_DOLLARS,
  EXCHANGE_DOLLARS_FOR_GOLD,
  RESET_EXCHANGE_TX
} from '../actions/actions';
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
  },
  exchangeTx: {
    blockHash: '',
    blockNumber: 0,
    cumulativeGasUsed: 0,
    gasUsed: 0,
    transactionHash: '',
    exchanged: new BigNumber(0),
    received: new BigNumber(0)
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

const exchangeAssets = (
  state,
  { exchanged, received, blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash, assets }
) => ({
  ...state,
  exchangeTx: {
    exchanged,
    received,
    blockHash,
    blockNumber,
    cumulativeGasUsed,
    gasUsed,
    transactionHash
  },
  assets
});

const resetExchangeTx = state => ({
  ...state,
  exchangeTx: { ...accountState.exchangeTx }
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
    case EXCHANGE_GOLD_FOR_DOLLARS:
      return evalActionPayload(state, action, exchangeAssets);
    case EXCHANGE_DOLLARS_FOR_GOLD:
      return evalActionPayload(state, action, exchangeAssets);
    case RESET_EXCHANGE_TX:
      return evalActionPayload(state, action, resetExchangeTx);
    default:
      return state;
  }
};

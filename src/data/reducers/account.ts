import {
  GET_ACCOUNT,
  REGISTER_ACCOUNT,
  EXCHANGE_GOLD_FOR_DOLLARS,
  EXCHANGE_DOLLARS_FOR_GOLD,
  RESET_EXCHANGE_TX,
  LOCK_GOLD,
  UNLOCK_GOLD,
  WITHDRAW_PENDING_WITHDRAWAL,
  LOG_OUT_WITH_LEDGER,
  UPVOTE_QUEUED_PROPOSAL
} from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import BigNumber from 'bignumber.js';

const baseTxFields = {
  blockHash: '',
  blockNumber: 0,
  cumulativeGasUsed: 0,
  gasUsed: 0,
  transactionHash: ''
};

const accountState = {
  address: '',
  summary: {
    name: '',
    authorizedSigners: {},
    metadataURL: '',
    wallet: '',
    dataEncryptionKey: ''
  },
  assets: {
    cGLD: new BigNumber(0),
    cUSD: new BigNumber(0),
    totalLockedGold: new BigNumber(0),
    nonVotingLockedGold: new BigNumber(0),
    pendingWithdrawals: []
  },
  accountTx: {
    ...baseTxFields
  },
  lockedGoldTx: {
    ...baseTxFields
  },
  exchangeTx: {
    ...baseTxFields,
    exchanged: new BigNumber(0),
    received: new BigNumber(0)
  },
  governanceTx: {
    ...baseTxFields
  }
};

const initialState = initialStateDecorator(accountState);

const getAccount = (state, { summary, assets }) => ({
  ...state,
  summary,
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

const handleAccountTx = (state, { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash }) => ({
  ...state,
  accountTx: {
    blockHash,
    blockNumber,
    cumulativeGasUsed,
    gasUsed,
    transactionHash
  }
});

const handleLockedGoldTx = (
  state,
  { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash, assets }
) => ({
  ...state,
  lockedGoldTx: {
    blockHash,
    blockNumber,
    cumulativeGasUsed,
    gasUsed,
    transactionHash
  },
  assets
});

const resetExchangeTx = (state) => ({
  ...state,
  exchangeTx: { ...accountState.exchangeTx }
});

const logOut = () => ({ ...accountState });

const upvote = (state, { txReceipt }) => ({
  ...state,
  governanceTx: { ...txReceipt }
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case GET_ACCOUNT:
      return evalActionPayload(state, action, getAccount);
    case REGISTER_ACCOUNT:
      return evalActionPayload(state, action, handleAccountTx);
    case EXCHANGE_GOLD_FOR_DOLLARS:
      return evalActionPayload(state, action, exchangeAssets);
    case EXCHANGE_DOLLARS_FOR_GOLD:
      return evalActionPayload(state, action, exchangeAssets);
    case RESET_EXCHANGE_TX:
      return evalActionPayload(state, action, resetExchangeTx);
    case LOCK_GOLD:
    case UNLOCK_GOLD:
    case WITHDRAW_PENDING_WITHDRAWAL:
      return evalActionPayload(state, action, handleLockedGoldTx);
    case LOG_OUT_WITH_LEDGER:
      return evalActionPayload(state, action, logOut);
    case UPVOTE_QUEUED_PROPOSAL:
      return evalActionPayload(state, action, upvote);
    default:
      return state;
  }
};

import {
  GET_ACCOUNT,
  GET_ACCOUNT_ASSETS,
  REGISTER_ACCOUNT,
  EXCHANGE_GOLD_FOR_DOLLARS,
  EXCHANGE_DOLLARS_FOR_GOLD,
  RESET_EXCHANGE_TX,
  LOCK_GOLD,
  UNLOCK_GOLD,
  WITHDRAW_PENDING_WITHDRAWAL,
  LOG_OUT_WITH_LEDGER,
  GET_ACCOUNT_EARNINGS
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
  summary: {
    name: '',
    address: '',
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
  isRegistered: false,
  earnings: {
    byGroupId: {},
    allGroupIds: [],
    byEpoch: {},
    allEpochs: []
  }
};

const initialState = initialStateDecorator(accountState);

const getAccount = (state, { summary, assets, isRegistered }) => ({
  ...state,
  summary,
  assets,
  isRegistered
});

const getAccountAssets = (state, { cGLD, cUSD, totalLockedGold, nonVotingLockedGold, pendingWithdrawals }) => ({
  ...state,
  assets: {
    cGLD,
    cUSD,
    totalLockedGold,
    nonVotingLockedGold,
    pendingWithdrawals
  }
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

const getAccountEarnings = (state, { earnings }) => ({
  ...state,
  earnings: {
    ...state.earnings,
    ...earnings
  }
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case GET_ACCOUNT:
      return evalActionPayload(state, action, getAccount);
    case GET_ACCOUNT_ASSETS:
      return evalActionPayload(state, action, getAccountAssets);
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
    case GET_ACCOUNT_EARNINGS:
      return evalActionPayload(state, action, getAccountEarnings);
    default:
      return state;
  }
};

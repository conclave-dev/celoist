import BigNumber from 'bignumber.js';
import {
  GET_ACCOUNT,
  REGISTER_ACCOUNT,
  EXCHANGE_GOLD_FOR_DOLLARS,
  EXCHANGE_DOLLARS_FOR_GOLD,
  RESET_EXCHANGE_TX,
  LOCK_GOLD,
  UNLOCK_GOLD,
  WITHDRAW_PENDING_WITHDRAWAL,
  UPVOTE_QUEUED_PROPOSAL
} from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import {
  getAccountSummary,
  registerAccount,
  exchangeAssets,
  lockGold,
  unlockGold,
  withdrawPendingWithdrawal,
  upvoteQueuedProposal
} from '../fetch/account';

const getAccount = () => async (dispatch, getState) => {
  handleInit(dispatch, GET_ACCOUNT);

  try {
    const { ledger } = getState().ledger;
    const { networkID } = getState().network;
    const { summary, assets } = await getAccountSummary(networkID, ledger);
    return handleData(dispatch, GET_ACCOUNT, { summary, assets });
  } catch (err) {
    return handleError(dispatch, GET_ACCOUNT, err);
  }
};

const registerUserAccount = () => async (dispatch, getState) => {
  handleInit(dispatch, REGISTER_ACCOUNT);

  try {
    const { ledger } = getState().ledger;
    const { networkID } = getState().network;
    const { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash } = await registerAccount(
      networkID,
      ledger
    );

    return handleData(dispatch, REGISTER_ACCOUNT, {
      blockHash,
      blockNumber,
      cumulativeGasUsed,
      gasUsed,
      transactionHash
    });
  } catch (err) {
    return handleError(dispatch, REGISTER_ACCOUNT, err);
  }
};

const exchangeGoldForDollars = (amount, minUSDAmount) => async (dispatch, getState) => {
  handleInit(dispatch, EXCHANGE_GOLD_FOR_DOLLARS);

  try {
    const { ledger } = getState().ledger;
    const { networkID } = getState().network;
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash },
      assets
    } = await exchangeAssets(networkID, amount, minUSDAmount, true, ledger);

    return handleData(dispatch, EXCHANGE_GOLD_FOR_DOLLARS, {
      exchanged: amount,
      received: minUSDAmount,
      blockHash,
      blockNumber,
      cumulativeGasUsed,
      gasUsed,
      transactionHash,
      assets
    });
  } catch (err) {
    return handleError(dispatch, EXCHANGE_GOLD_FOR_DOLLARS, err);
  }
};

const exchangeDollarsForGold = (amount, minGLDAmount) => async (dispatch, getState) => {
  handleInit(dispatch, EXCHANGE_DOLLARS_FOR_GOLD);

  try {
    const { ledger } = getState().ledger;
    const { networkID } = getState().network;
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash },
      assets
    } = await exchangeAssets(networkID, amount, minGLDAmount, false, ledger);

    return handleData(dispatch, EXCHANGE_DOLLARS_FOR_GOLD, {
      exchanged: amount,
      received: minGLDAmount,
      blockHash,
      blockNumber,
      cumulativeGasUsed,
      gasUsed,
      transactionHash,
      assets
    });
  } catch (err) {
    return handleError(dispatch, EXCHANGE_DOLLARS_FOR_GOLD, err);
  }
};

const lockAvailableGold = (amount) => async (dispatch, getState) => {
  handleInit(dispatch, LOCK_GOLD);

  try {
    const { ledger } = getState().ledger;
    const { networkID } = getState().network;
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash },
      assets
    } = await lockGold(networkID, amount, ledger);

    return handleData(dispatch, LOCK_GOLD, {
      blockHash,
      blockNumber,
      cumulativeGasUsed,
      gasUsed,
      transactionHash,
      assets
    });
  } catch (err) {
    return handleError(dispatch, LOCK_GOLD, err);
  }
};

const unlockLockedGold = (amount) => async (dispatch, getState) => {
  handleInit(dispatch, UNLOCK_GOLD);

  try {
    const { ledger } = getState().ledger;
    const { networkID } = getState().network;
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash },
      assets
    } = await unlockGold(networkID, amount, ledger);

    return handleData(dispatch, UNLOCK_GOLD, {
      blockHash,
      blockNumber,
      cumulativeGasUsed,
      gasUsed,
      transactionHash,
      assets
    });
  } catch (err) {
    return handleError(dispatch, UNLOCK_GOLD, err);
  }
};

const withdrawPendingGold = (index) => async (dispatch, getState) => {
  handleInit(dispatch, WITHDRAW_PENDING_WITHDRAWAL);

  try {
    const { ledger } = getState().ledger;
    const { networkID } = getState().network;
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash },
      assets
    } = await withdrawPendingWithdrawal(networkID, index, ledger);

    return handleData(dispatch, WITHDRAW_PENDING_WITHDRAWAL, {
      blockHash,
      blockNumber,
      cumulativeGasUsed,
      gasUsed,
      transactionHash,
      assets
    });
  } catch (err) {
    return handleError(dispatch, WITHDRAW_PENDING_WITHDRAWAL, err);
  }
};

const resetExchangeTx = () => async (dispatch) => handleData(dispatch, RESET_EXCHANGE_TX);

const upvote = (proposalID: BigNumber.Value) => async (dispatch, getState) => {
  handleInit(dispatch, UPVOTE_QUEUED_PROPOSAL);

  try {
    const { ledger } = getState().ledger;
    const { networkID } = getState().network;
    const { txReceipt } = await upvoteQueuedProposal(networkID, proposalID, ledger);

    return handleData(dispatch, UPVOTE_QUEUED_PROPOSAL, txReceipt);
  } catch (err) {
    return handleError(dispatch, UPVOTE_QUEUED_PROPOSAL, err);
  }
};

export {
  getAccount,
  registerUserAccount,
  exchangeGoldForDollars,
  exchangeDollarsForGold,
  resetExchangeTx,
  lockAvailableGold,
  unlockLockedGold,
  withdrawPendingGold,
  upvote
};

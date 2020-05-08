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
  GET_ACCOUNT_EARNINGS
} from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import {
  getAccountSummary,
  registerAccount,
  getAssets,
  exchangeAssets,
  lockGold,
  unlockGold,
  withdrawPendingWithdrawal,
  fetchAccountEarnings
} from '../fetch/account';

const getAccount = (account: string) => async (dispatch, getState) => {
  handleInit(dispatch, GET_ACCOUNT);

  try {
    const { summary, assets, isRegistered } = await getAccountSummary(account);
    return handleData(dispatch, GET_ACCOUNT, { summary, assets, isRegistered });
  } catch (err) {
    return handleError(dispatch, GET_ACCOUNT, err);
  }
};

const getAccountAssets = () => async (dispatch, getState) => {
  handleInit(dispatch, GET_ACCOUNT_ASSETS);

  try {
    const {
      summary: { address }
    } = getState().account;
    const { cGLD, cUSD, totalLockedGold, nonVotingLockedGold, pendingWithdrawals } = await getAssets(address);
    return handleData(dispatch, GET_ACCOUNT_ASSETS, {
      cGLD,
      cUSD,
      totalLockedGold,
      nonVotingLockedGold,
      pendingWithdrawals
    });
  } catch (err) {
    return handleError(dispatch, GET_ACCOUNT_ASSETS, err);
  }
};

const registerUserAccount = () => async (dispatch, getState) => {
  handleInit(dispatch, REGISTER_ACCOUNT);

  try {
    const { ledger } = getState().ledger;
    const { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash } = await registerAccount(ledger);

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
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash },
      assets
    } = await exchangeAssets(amount, minUSDAmount, true, ledger);

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
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash },
      assets
    } = await exchangeAssets(amount, minGLDAmount, false, ledger);

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
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash },
      assets
    } = await lockGold(amount, ledger);

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
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash },
      assets
    } = await unlockGold(amount, ledger);

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
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash },
      assets
    } = await withdrawPendingWithdrawal(index, ledger);

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

const getAccountEarnings = (account: string) => async (dispatch) => {
  handleInit(dispatch, GET_ACCOUNT_EARNINGS);

  try {
    const { byGroupId, allGroupIds } = await fetchAccountEarnings(account);

    return handleData(dispatch, GET_ACCOUNT_EARNINGS, { byGroupId, allGroupIds });
  } catch (err) {
    return handleError(dispatch, GET_ACCOUNT_EARNINGS, err);
  }
};

export {
  getAccount,
  registerUserAccount,
  getAccountAssets,
  exchangeGoldForDollars,
  exchangeDollarsForGold,
  resetExchangeTx,
  lockAvailableGold,
  unlockLockedGold,
  withdrawPendingGold,
  getAccountEarnings
};

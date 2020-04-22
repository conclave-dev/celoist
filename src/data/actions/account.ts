import { CONNECT_LEDGER, DISCONNECT_LEDGER, SET_ACCOUNT } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { setUpLedger, getAccountSummary } from '../fetch/account';

const connectLedger = (accountIndex: number = 0) => async dispatch => {
  handleInit(dispatch, CONNECT_LEDGER);

  try {
    const ledger = await setUpLedger(accountIndex);
    return handleData(dispatch, CONNECT_LEDGER, { ledger });
  } catch (err) {
    return handleError(dispatch, CONNECT_LEDGER, err);
  }
};

const disconnectLedger = () => async (dispatch, getState) => {
  handleInit(dispatch, DISCONNECT_LEDGER);

  try {
    const {
      ledger: { ledger }
    } = getState().account;

    await ledger.transport.close();

    return handleData(dispatch, DISCONNECT_LEDGER, { ledger: {} });
  } catch (err) {
    return handleError(dispatch, DISCONNECT_LEDGER, err);
  }
};

const setAccount = () => async (dispatch, getState) => {
  handleInit(dispatch, SET_ACCOUNT);

  try {
    const { ledger } = getState().account;
    const account = await getAccountSummary(ledger.getAccounts()[0]);
    return handleData(dispatch, SET_ACCOUNT, { ...account });
  } catch (err) {
    return handleError(dispatch, SET_ACCOUNT, err);
  }
};

export { connectLedger, disconnectLedger, setAccount };

import { CONNECT_LEDGER, DISCONNECT_LEDGER } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { setUpLedger } from '../fetch/ledger';

const connectLedger = (accountIndex: number = 0) => async (dispatch) => {
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
    const { ledger: { ledger }} = getState().wallets;

    await ledger.transport.close();

    return handleData(dispatch, DISCONNECT_LEDGER, { ledger: {} });
  } catch (err) {
    return handleError(dispatch, DISCONNECT_LEDGER, err);
  }
};

export { connectLedger, disconnectLedger };

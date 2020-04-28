import { LOG_IN_LEDGER, LOG_OUT_LEDGER } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { setUpLedger } from '../fetch/account';

const logInLedger = (accountIndex = 0) => async (dispatch) => {
  handleInit(dispatch, LOG_IN_LEDGER);

  try {
    const ledger = await setUpLedger(accountIndex);
    return handleData(dispatch, LOG_IN_LEDGER, { ledger });
  } catch (err) {
    return handleError(dispatch, LOG_IN_LEDGER, err);
  }
};

const logOutLedger = () => async (dispatch, getState) => {
  handleInit(dispatch, LOG_OUT_LEDGER);

  try {
    const {
      ledger: { ledger }
    } = getState().account;

    await ledger.transport.close();

    return handleData(dispatch, LOG_OUT_LEDGER, { ledger: {} });
  } catch (err) {
    return handleError(dispatch, LOG_OUT_LEDGER, err);
  }
};

export { logInLedger, logOutLedger };

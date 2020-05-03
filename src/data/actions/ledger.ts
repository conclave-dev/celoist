import { LOG_IN_WITH_LEDGER, LOG_OUT_WITH_LEDGER } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { connectLedger, disconnectLedger } from '../fetch/ledger';

const logInWithLedger = (accountIndex = 0) => async (dispatch) => {
  handleInit(dispatch, LOG_IN_WITH_LEDGER);

  try {
    const ledger = await connectLedger(accountIndex);
    return handleData(dispatch, LOG_IN_WITH_LEDGER, { ledger });
  } catch (err) {
    return handleError(dispatch, LOG_IN_WITH_LEDGER, err);
  }
};

const logOutWithLedger = () => async (dispatch, getState) => {
  handleInit(dispatch, LOG_OUT_WITH_LEDGER);

  try {
    const { ledger } = getState().ledger;

    await disconnectLedger(ledger);

    return handleData(dispatch, LOG_OUT_WITH_LEDGER, {});
  } catch (err) {
    return handleError(dispatch, LOG_OUT_WITH_LEDGER, err);
  }
};

export { logInWithLedger, logOutWithLedger };

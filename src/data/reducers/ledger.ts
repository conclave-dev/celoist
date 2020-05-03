import { LOG_IN_WITH_LEDGER, LOG_OUT_WITH_LEDGER } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';

const ledgerState = {
  ledger: {}
};

const initialState = initialStateDecorator(ledgerState);

const logInWithLedger = (state, { ledger }) => ({
  ...state,
  ledger
});

const logOutWithLedger = () => ledgerState;

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case LOG_IN_WITH_LEDGER:
      return evalActionPayload(state, action, logInWithLedger);
    case LOG_OUT_WITH_LEDGER:
      return evalActionPayload(state, action, logOutWithLedger);
    default:
      return state;
  }
};

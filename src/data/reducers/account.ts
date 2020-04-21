import { CONNECT_LEDGER, DISCONNECT_LEDGER } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';

const accountState = {
  ledger: {}
};

const initialState = initialStateDecorator(accountState);

const connectLedger = (state, { ledger }) => ({
  ...state,
  ledger
});

const disconnectLedger = (state, { ledger }) => ({
  ...state,
  ledger
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case CONNECT_LEDGER:
      return evalActionPayload(state, action, connectLedger);
    case DISCONNECT_LEDGER:
      return evalActionPayload(state, action, disconnectLedger);
    default:
      return state;
  }
};

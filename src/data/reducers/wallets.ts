import { CONNECT_LEDGER } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';

const walletState = {
  ledger: {}
};

const initialState = initialStateDecorator(walletState);

const connectLedger = (state, { ledger }) => ({
  ...state,
  ledger
});

export default (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case CONNECT_LEDGER:
      return evalActionPayload(state, action, connectLedger);
    default:
      return state;
  }
};

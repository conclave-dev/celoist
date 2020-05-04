// Commonly used fields when tracking sent transactions
const baseTxFields = {
  blockHash: '',
  blockNumber: 0,
  cumulativeGasUsed: 0,
  gasUsed: 0,
  transactionHash: ''
};

// Extends initial state with "boilerplate" properties
const initialStateDecorator = (state: any) => ({
  ...state,
  inProgress: false,
  errorCode: 0,
  errorMessage: ''
});

// Flexible handlers for different status cases
const reduceInit = (state: any) => ({
  ...state,
  inProgress: true,
  errorCode: 0,
  errorMessage: ''
});

const reduceData = (newState: any) => ({
  ...newState,
  inProgress: false
});

const reduceError = (state: any, { status, message }) => ({
  ...state,
  errorCode: status,
  errorMessage: message,
  inProgress: false
});

const evalActionPayload = (state, action, caseReducer: Function) => {
  const { status } = action;

  switch (status) {
    case 100:
      return reduceInit(state);
    case 200:
      return reduceData(caseReducer(state, action));
    default:
      return reduceError(state, action);
  }
};

export { baseTxFields, initialStateDecorator, evalActionPayload };

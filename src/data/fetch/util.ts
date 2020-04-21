import { backend } from './api';

const defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Connection: 'Keep-Alive'
  }
};

// Resolves the promise from calling `json` and returns the value of `data`
const unpackResponse = async (response: Response) => (await response.json()).data;

const backendFetch = async (endpoint: string, data: object = {}) => {
  try {
    return unpackResponse(
      await fetch(`${backend}${endpoint}`, {
        ...defaultOptions,
        body: JSON.stringify(data)
      })
    );
  } catch (err) {
    return err;
  }
};

const getGasConfig = async (kit, tx) => {
  const txClone = { ...tx };
  txClone.gasPrice = await kit.web3.eth.getGasPrice();
  txClone.gas = await kit.web3.eth.estimateGas();
  return txClone;
};

export { backendFetch, defaultOptions, getGasConfig };

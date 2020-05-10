import { isEmpty } from 'lodash';
import { getRpcKit } from './api';

const kitContracts = {};
const web3Contracts = {};
const contractGetters = {
  accounts: 'getAccounts',
  exchange: 'getExchange',
  goldToken: 'getGoldToken',
  stableToken: 'getStableToken',
  lockedGold: 'getLockedGold',
  validators: 'getValidators',
  election: 'getElection',
  governance: 'getGovernance'
};

const getCacheKey = (networkID: string, contract: string) => `${networkID}-${contract}`;

const getKitContract = async (networkID: string, contract: string) => {
  const key = getCacheKey(networkID, contract);
  if (!isEmpty(kitContracts[key])) {
    return kitContracts[key];
  }
  const kit = getRpcKit(networkID);
  const contractGetterFn = contractGetters[contract];
  kitContracts[key] = await kit.contracts[contractGetterFn]();

  return kitContracts[key];
};

const getWeb3Contract = async (networkID: string, contract: string) => {
  const key = getCacheKey(networkID, contract);
  if (!isEmpty(web3Contracts[key])) {
    return web3Contracts[key];
  }
  const kit = getRpcKit(networkID);
  const contractGetterFn = contractGetters[contract];
  web3Contracts[key] = await kit._web3Contracts[contractGetterFn]();

  return web3Contracts[key];
};

const getContractMethodCallABI = async ({
  contract,
  contractMethod,
  contractMethodArgs
}: {
  contract: any;
  contractMethod: string;
  contractMethodArgs?: any[];
}) => {
  return await contract[contractMethod].apply(null, contractMethodArgs).txo.encodeABI();
};

export { getKitContract, getWeb3Contract, getContractMethodCallABI };

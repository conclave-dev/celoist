import { newKit } from '@celo/contractkit';
import { isEmpty } from 'lodash';
import { rpcChain } from './api';

const kit = newKit(rpcChain);
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

const getKitContract = async (contract: string) => {
  if (!isEmpty(kitContracts[contract])) {
    return kitContracts[contract];
  }
  const contractGetterFn = contractGetters[contract];
  kitContracts[contract] = await kit.contracts[contractGetterFn]();

  return kitContracts[contract];
};

const getWeb3Contract = async (contract: string) => {
  if (!isEmpty(web3Contracts[contract])) {
    return web3Contracts[contract];
  }
  const contractGetterFn = contractGetters[contract];
  web3Contracts[contract] = await kit._web3Contracts[contractGetterFn]();

  return web3Contracts[contract];
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

import { newKit } from '@celo/contractkit';
import { isEmpty } from 'lodash';
import { rpcChain } from './api';

const kit = newKit(rpcChain);
const kitContracts: {
  accounts: any;
  exchange: any;
  goldToken: any;
  stableToken: any;
  lockedGold: any;
  validators: any;
  election: any;
  governance: any;
} = {
  accounts: {},
  exchange: {},
  goldToken: {},
  stableToken: {},
  lockedGold: {},
  validators: {},
  election: {},
  governance: {}
};
const kitContractGetters = {
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
  const contractGetterFn = kitContractGetters[contract];
  kitContracts[contract] = await kit.contracts[contractGetterFn]();

  return kitContracts[contract];
};

export { getKitContract };

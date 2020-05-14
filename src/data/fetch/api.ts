import { newKit } from '@celo/contractkit';
import { networkConfigurations } from '../../util/constants';

// const backend = 'http://localhost:3001';
const backend = 'https://backend.celoist.com';
const wsChain = 'wss://geth-ws.celoist.com';
const defaultNetworkID = 'baklava';

const kits = {};

const getRpcKit = (networkID) => {
  if (!kits[networkID]) {
    kits[networkID] = newKit(networkConfigurations[networkID].rpc);
  }

  return kits[networkID];
};

export { backend, wsChain, defaultNetworkID, getRpcKit };

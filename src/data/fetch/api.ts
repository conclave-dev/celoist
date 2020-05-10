import { newKit } from '@celo/contractkit';

const networkConfigurations = {
  baklava: {
    rpc: 'https://geth.celoist.com'
  },
  rc1: {
    rpc: 'https://rpc.celoist.com'
  }
};

const backend = 'https://backend.celoist.com';
const wsChain = 'wss://geth-ws.celoist.com';

const kits = {};

const rpcChain = 'https://geth.celoist.com';
const rpcKit = newKit(rpcChain);

const defaultNetworkID = 'baklava';

const getRpcKit = (networkID) => {
  if (!kits[networkID]) {
    kits[networkID] = newKit(networkConfigurations[networkID].rpc);
  }

  return kits[networkID];
};

export { backend, wsChain, rpcKit, rpcChain, defaultNetworkID };

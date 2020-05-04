import { newKit } from '@celo/contractkit';

const backend = 'https://backend.celoist.com';
const rpcChain = 'https://geth.celoist.com';
const wsChain = 'wss://geth-ws.celoist.com';

const rpcKit = newKit(rpcChain);

export { backend, rpcChain, wsChain, rpcKit };

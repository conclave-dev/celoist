import { Wallet } from '@celo/contractkit/lib/wallets/wallet';
import { newLedgerWalletWithSetup } from '@celo/contractkit/lib/wallets/ledger-wallet';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import { rpcKit } from './api';

const derivationPathBase = "44'/52752'/0'";

const connectLedger = async (derivationPathIndex: number) => {
  const transport = await TransportU2F.create();

  transport.exchangeTimeout = 60000;
  transport.unresponsiveTimeout = 10000;

  return newLedgerWalletWithSetup(transport, [derivationPathIndex], derivationPathBase);
};

const disconnectLedger = (ledger) => ledger.transport.close();

const sendTxWithLedger = async (ledger: Wallet, to: string, data: string) => {
  const [account] = ledger.getAccounts();
  const tx = {
    from: account,
    to,
    data,
    gas: 20000000,
    gatewayFee: `0x${(20000).toString(16)}`,
    nonce: await rpcKit.web3.eth.getTransactionCount(account),
    gasPrice: await rpcKit.web3.eth.getGasPrice(),
    chainId: await rpcKit.web3.eth.getChainId()
  };
  const { raw: signedTxRaw } = await ledger.signTransaction(tx);

  return rpcKit.web3.eth.sendSignedTransaction(signedTxRaw);
};

export { connectLedger, disconnectLedger, sendTxWithLedger };

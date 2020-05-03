import { newLedgerWalletWithSetup } from '@celo/contractkit/lib/wallets/ledger-wallet';
import TransportU2F from '@ledgerhq/hw-transport-u2f';

const derivationPathBase = "44'/52752'/0'";

const connectLedger = async (derivationPathIndex: number) => {
  const transport = await TransportU2F.create();

  transport.exchangeTimeout = 60000;
  transport.unresponsiveTimeout = 10000;

  return newLedgerWalletWithSetup(transport, [derivationPathIndex], derivationPathBase);
};

const disconnectLedger = (ledger) => ledger.transport.close();

export { connectLedger, disconnectLedger };

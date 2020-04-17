import { newLedgerWalletWithSetup } from '@celo/contractkit/lib/wallets/ledger-wallet';
import TransportU2F from '@ledgerhq/hw-transport-u2f';

const derivationPathBase = "44'/52752'/0'/0/";

const setUpLedger = async (derivationPathIndex: number) => {
  const transport = await TransportU2F.create();

  transport.exchangeTimeout = 5000;
  transport.unresponsiveTimeout = 5000;

  return newLedgerWalletWithSetup(transport, [derivationPathIndex], derivationPathBase);
};

export { setUpLedger };

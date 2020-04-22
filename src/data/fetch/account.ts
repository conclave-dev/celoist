import { newKit } from '@celo/contractkit';
import { newLedgerWalletWithSetup } from '@celo/contractkit/lib/wallets/ledger-wallet';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import { rpcChain } from './api';

const derivationPathBase = "44'/52752'/0'/0";
const kit = newKit(rpcChain);

const setUpLedger = async (derivationPathIndex: number) => {
  const transport = await TransportU2F.create();

  transport.exchangeTimeout = 60000;
  transport.unresponsiveTimeout = 10000;

  return newLedgerWalletWithSetup(transport, [derivationPathIndex], derivationPathBase);
};

const getAccountSummary = async (account: string) => {
  const accountContract = await kit.contracts.getAccounts();
  return accountContract.getAccountSummary(account);
};

export { setUpLedger, getAccountSummary };

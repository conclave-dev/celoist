import React, { PureComponent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Row, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import BigNumber from 'bignumber.js';
import Anchor from '../reusable/Anchor';
import Spinner from '../reusable/Spinner';
import { getExchangeRates, removeExchangeRates } from '../../../data/actions/network';
import { resetExchangeTx } from '../../../data/actions/account';
import { exchangeDollarsForGold, exchangeGoldForDollars } from '../../../data/actions/account';

const SweetAlert = withReactContent(Swal);

const mapState = ({ network: { exchangeRates }, account: { exchangeTx, errorMessage } }, ownProps) => ({
  exchangeRates,
  exchangeTx,
  errorMessage,
  ...ownProps
});
const mapDispatch = {
  getExchangeRates,
  removeExchangeRates,
  exchangeDollarsForGold,
  exchangeGoldForDollars,
  resetExchangeTx
};
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const GoldText = () => <span style={{ color: '#fbcc5c' }}>cGLD</span>;
const DollarText = () => <span style={{ color: '#35D07F' }}>cUSD</span>;

const DollarsToGoldExchanger = ({ dollarsToGold }: { dollarsToGold: BigNumber }) => {
  const [amount, setAmount] = useState('0');
  const parsedAmount = new BigNumber(parseFloat(amount) || 0);

  return (
    <Row className="justify-content-center">
      <Row noGutters className="justify-content-center pt-1" style={{ width: '80%' }}>
        <p className="text-center" style={{ marginBottom: 0 }}>
          Current exchange rate:
        </p>
      </Row>
      <Row noGutters className="justify-content-center" style={{ width: '80%' }}>
        <p className="text-center">
          1 <DollarText /> = {dollarsToGold.toNumber()} <GoldText />
        </p>
      </Row>
      <Row noGutters className="pt-1 pb-3" style={{ width: '65%' }}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>cUSD Amount</InputGroupText>
          </InputGroupAddon>
          <Input id="amount" value={amount} onChange={(evt) => setAmount(evt.currentTarget.value)} />
        </InputGroup>
      </Row>
      <Row noGutters className="justify-content-center" style={{ width: '80%' }}>
        <p className="text-center" style={{ marginBottom: 8 }}>
          You will receive approximately {dollarsToGold.multipliedBy(parsedAmount).toNumber()} <GoldText />.
        </p>
      </Row>
    </Row>
  );
};

const GoldToDollarsExchanger = ({ goldToDollars }: { goldToDollars: BigNumber }) => {
  const [amount, setAmount] = useState('0');
  const parsedAmount = new BigNumber(parseFloat(amount) || 0);

  return (
    <Row className="justify-content-center">
      <Row noGutters className="justify-content-center pt-1" style={{ width: '80%' }}>
        <p className="text-center" style={{ marginBottom: 0 }}>
          Current exchange rate:
        </p>
      </Row>
      <Row noGutters className="justify-content-center" style={{ width: '65%' }}>
        <p className="text-center">
          1 <GoldText /> = {goldToDollars.toNumber()} <DollarText />
        </p>
      </Row>
      <Row noGutters className="pt-1 pb-3" style={{ width: '80%' }}>
        <InputGroup>
          <InputGroupAddon addonType="prepend">
            <InputGroupText>cGLD Amount</InputGroupText>
          </InputGroupAddon>
          <Input id="amount" type="number" value={amount} onChange={(evt) => setAmount(evt.currentTarget.value)} />
        </InputGroup>
      </Row>
      <Row noGutters className="justify-content-center" style={{ width: '80%' }}>
        <p className="text-center" style={{ marginBottom: 8 }}>
          You will receive approximately {goldToDollars.multipliedBy(parsedAmount).toNumber()} <DollarText />.
        </p>
      </Row>
    </Row>
  );
};

class AssetExchanger extends PureComponent<Props> {
  componentDidMount = () => {
    this.props.getExchangeRates();
  };

  componentDidUpdate = (prevProps) => {
    const { exchangeTx: prevExchangeTx, errorMessage: prevErrorMessage } = prevProps;
    const { exchangeTx, errorMessage } = this.props;

    if (exchangeTx.transactionHash && prevExchangeTx.transactionHash !== exchangeTx.transactionHash) {
      return this.exchangeSuccessHandler();
    }

    if (!prevErrorMessage && errorMessage) {
      return this.exchangeErrorHandler();
    }
  };

  exchangeSuccessHandler = () =>
    SweetAlert.fire({
      title: 'Exchange Details',
      icon: 'success',
      html: (
        <div className="pt-4 pb-4">
          <p className="text-center" style={{ marginBottom: 0 }}>
            Congratulations! Your exchange was successful. You can view the details{' '}
            <Anchor
              href={`https://baklava-blockscout.celo-testnet.org/tx/${this.props.exchangeTx.transactionHash}`}
              color="3488ec"
            >
              here
            </Anchor>
            .
          </p>
        </div>
      ),
      showConfirmButton: false,
      showCancelButton: false,
      showCloseButton: true,
      onClose: () => this.exchangerCloseHandler()
    });

  exchangeProgressHandler = (exchangeAmount, receiveAmount, sellGold) =>
    SweetAlert.fire({
      title: 'Exchanging...',
      html: (
        <div className="pt-4 pb-4">
          <p>Review and confirm the transactions (approval and exchange) on your Ledger to initiate the exchange.</p>
          <Spinner />
        </div>
      ),
      showConfirmButton: false,
      showCancelButton: false,
      onOpen: () =>
        sellGold
          ? this.props.exchangeGoldForDollars(exchangeAmount, receiveAmount)
          : this.props.exchangeDollarsForGold(exchangeAmount, receiveAmount),
      onClose: () => this.exchangerCloseHandler()
    });

  exchangeErrorHandler = (
    errorMsg = 'We encountered an exchange error (normal during high periods of network-usage), please try again.'
  ) =>
    SweetAlert.fire({
      title: 'Exchange Failed',
      icon: 'error',
      html: (
        <div className="pt-4 pb-4">
          <p className="text-center" style={{ marginBottom: 0 }}>
            {errorMsg}
          </p>
        </div>
      ),
      showCancelButton: false,
      showConfirmButton: false,
      showCloseButton: true
    });

  exchangerCloseHandler = () => {
    this.props.removeExchangeRates();
    this.props.clearExchangerAssetSymbol();
  };

  render = () => {
    const { assetSymbol, exchangeRates } = this.props;
    const hasExchangeRates = !exchangeRates.dollarsToGold.isZero() && !exchangeRates.goldToDollars.isZero();

    if (hasExchangeRates) {
      assetSymbol === 'cGLD'
        ? SweetAlert.fire({
            title: 'Exchange cUSD for cGLD',
            html: <DollarsToGoldExchanger dollarsToGold={exchangeRates.dollarsToGold} />,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'Exchange',
            preConfirm: () => {
              // Addresses "has no property value" ts error https://stackoverflow.com/a/43823786
              const amountElement = window.document.getElementById('amount') as HTMLInputElement;
              const dollarAmount = new BigNumber(amountElement.value);

              if (dollarAmount.isZero() || dollarAmount.isNaN()) {
                return this.exchangeErrorHandler('The exchange amount you entered was invalid, please try again.');
              }

              this.exchangeProgressHandler(dollarAmount, exchangeRates.dollarsToGold.multipliedBy(dollarAmount), false);
            },
            onClose: this.exchangerCloseHandler
          })
        : SweetAlert.fire({
            title: 'Exchange cGLD for cUSD',
            html: <GoldToDollarsExchanger goldToDollars={exchangeRates.goldToDollars} />,
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonText: 'EXCHANGE',
            preConfirm: () => {
              // Addresses "has no property value" ts error https://stackoverflow.com/a/43823786
              const amountElement = window.document.getElementById('amount') as HTMLInputElement;
              const goldAmount = new BigNumber(amountElement.value);

              if (goldAmount.isZero() || goldAmount.isNaN()) {
                return this.exchangeErrorHandler('The exchange amount you entered was invalid, please try again.');
              }

              this.exchangeProgressHandler(goldAmount, exchangeRates.goldToDollars.multipliedBy(goldAmount), true);
            },
            onClose: this.exchangerCloseHandler
          });
    }

    return <></>;
  };
}

export default connector(AssetExchanger);

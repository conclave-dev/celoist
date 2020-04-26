import React, { PureComponent, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Row, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import BigNumber from 'bignumber.js';
import { getExchangeRates, removeExchangeRates } from '../../../data/actions/network';
import { exchangeDollarsForGold, exchangeGoldForDollars } from '../../../data/actions/account';

const SweetAlert = withReactContent(Swal);

const mapState = ({ network: { exchangeRates } }, ownProps) => ({ exchangeRates, ...ownProps });
const mapDispatch = { getExchangeRates, removeExchangeRates, exchangeDollarsForGold, exchangeGoldForDollars };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const GoldText = () => <span style={{ color: '#fbcc5c' }}>cGLD</span>;
const DollarText = () => <span style={{ color: '#35D07F' }}>cUSD</span>;

const DollarsToGoldExchanger = ({ dollarsToGold }) => {
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
          <Input id="amount" value={amount} onChange={evt => setAmount(evt.currentTarget.value)} />
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

const GoldToDollarsExchanger = ({ goldToDollars }) => {
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
          <Input id="amount" type="number" value={amount} onChange={evt => setAmount(evt.currentTarget.value)} />
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
              // @ts-ignore
              const dollarAmount = new BigNumber(window.document.getElementById('amount').value);

              if (!dollarAmount.isZero()) {
                SweetAlert.fire({
                  title: 'Exchanging...',
                  html: `
                    <div class="pt-4 pb-4">
                      <div role="status" class="spinner-grow text-success" />
                    </div>
                  `,
                  showConfirmButton: false,
                  showCancelButton: true,
                  onOpen: () =>
                    this.props.exchangeDollarsForGold(
                      dollarAmount,
                      exchangeRates.dollarsToGold.multipliedBy(dollarAmount)
                    )
                });
              }
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
              // @ts-ignore
              const goldAmount = new BigNumber(window.document.getElementById('amount').value);

              if (!goldAmount.isZero()) {
                SweetAlert.fire({
                  title: 'Exchanging...',
                  html: `
                    <div class="pt-4 pb-4">
                      <div role="status" class="spinner-grow text-warning" />
                    </div>
                  `,
                  showConfirmButton: false,
                  showCancelButton: true,
                  onOpen: () =>
                    this.props.exchangeGoldForDollars(goldAmount, exchangeRates.goldToDollars.multipliedBy(goldAmount))
                });
              }
            },
            onClose: this.exchangerCloseHandler
          });
    }

    return <></>;
  };
}

export default connector(AssetExchanger);

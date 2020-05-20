import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import BigNumber from 'bignumber.js';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Anchor from '../reusable/Anchor';
import Spinner from '../reusable/Spinner';
import AssetExchanger from './AssetExchanger';
import ProfileAssetsChart from './ProfileAssetsChart';
import greenCoin from '../../../assets/png/greenCoin.png';
import goldCoin from '../../../assets/png/goldCoin.png';
import ResponsiveWrapper from '../reusable/ResponsiveWrapper';
import { getExchangeRates, removeExchangeRates } from '../../../data/actions/network';
import { resetExchangeTx } from '../../../data/actions/account';
import { exchangeDollarsForGold, exchangeGoldForDollars } from '../../../data/actions/account';

const SweetAlert = withReactContent(Swal);

const mapState = (
  { network: { exchangeRates, networkID, networkURL }, account: { assets, exchangeTx, errorMessage } },
  ownProps
) => ({
  exchangeRates,
  networkID,
  networkURL,
  assets,
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

class ProfileAssets extends PureComponent<Props, { assetSymbol: string }> {
  constructor(props) {
    super(props);
    this.state = {
      assetSymbol: ''
    };

    if (props.exchangeRates.goldToDollars.isZero() || props.exchangeRates.dollarsToGold.isZero()) {
      props.getExchangeRates();
    }
  }

  setAssetSymbol = (assetSymbol: string) => this.setState({ assetSymbol }, this.openAssetExchanger);

  clearAssetSymbol = () => this.setState({ assetSymbol: '' });

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

  openAssetExchanger = () => {
    const { assetSymbol } = this.state;
    const { exchangeRates } = this.props;
    const counterAssetSymbol = assetSymbol === 'cGLD' ? 'cUSD' : 'cGLD';

    return SweetAlert.fire({
      title: `Exchange ${assetSymbol} for ${counterAssetSymbol}`,
      html: <AssetExchanger assetSymbol={assetSymbol} exchangeRates={exchangeRates} />,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Exchange',
      preConfirm: () => {
        // Addresses "has no property value" ts error https://stackoverflow.com/a/43823786
        const amountElement = window.document.getElementById('amount') as HTMLInputElement;
        const amount = new BigNumber(amountElement.value);
        const exchangeRate = assetSymbol === 'cGLD' ? exchangeRates.goldToDollars : exchangeRates.dollarsToGold;

        if (amount.isZero() || amount.isNaN()) {
          return this.exchangeErrorHandler('The exchange amount you entered was invalid, please try again.');
        }

        this.exchangeProgressHandler(amount, exchangeRate.multipliedBy(amount), assetSymbol === 'cGLD');
      },
      onClose: this.exchangerCloseHandler
    });
  };

  exchangeSuccessHandler = () =>
    SweetAlert.fire({
      title: 'Exchange Details',
      icon: 'success',
      html: (
        <div className="pt-4 pb-4">
          <p className="text-center" style={{ marginBottom: 0 }}>
            Congratulations! Your exchange was successful. You can view the details{' '}
            <Anchor href={`${this.props.networkURL}/tx/${this.props.exchangeTx.transactionHash}`} color="3488ec">
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
    this.clearAssetSymbol();
  };

  render = () => {
    const {
      assets: { cGLD, cUSD }
    } = this.props;
    const { assetSymbol } = this.state;
    const hasBalance = !cGLD.isZero() || !cUSD.isZero();

    return (
      <Card>
        <CardBody>
          <ResponsiveWrapper mobileClasses="d-flex justify-content-center">
            <Row
              noGutters
              className="justify-content-between align-items-center"
              style={{ width: '100%', flexWrap: 'nowrap' }}
            >
              <Col lg={5} xs={5}>
                <h4 className="card-title">Assets</h4>
              </Col>
              <Col lg={7} xs={7} className="d-flex justify-content-end" style={{ flexWrap: 'nowrap', paddingRight: 0 }}>
                <Button
                  disabled={!hasBalance}
                  className="waves-effect waves-light mr-1"
                  style={{
                    color: '#FFF',
                    backgroundColor: hasBalance ? '#35D07F' : '#9ca8b3',
                    border: 'none',
                    height: 32,
                    paddingTop: 0,
                    paddingBottom: 0
                  }}
                  onClick={() => {
                    if (assetSymbol) {
                      return this.clearAssetSymbol();
                    }

                    this.setAssetSymbol('cGLD');
                  }}
                >
                  <div className="d-flex align-items-center">
                    <i className="mdi mdi-sync" />
                    <img src={goldCoin} height={16} alt="coin" />
                  </div>
                </Button>
                <Button
                  disabled={!hasBalance}
                  className="waves-effect waves-light ml-1"
                  style={{
                    color: '#FFF',
                    backgroundColor: hasBalance ? '#fbcc5c' : '#9ca8b3',
                    border: 'none',
                    height: 32,
                    paddingTop: 0,
                    paddingBottom: 0
                  }}
                  onClick={() => {
                    if (assetSymbol) {
                      return this.clearAssetSymbol();
                    }

                    this.setAssetSymbol('cUSD');
                  }}
                >
                  <div className="d-flex align-items-center">
                    <i className="mdi mdi-sync" />
                    <img src={greenCoin} height={16} alt="coin" />
                  </div>
                </Button>
              </Col>
            </Row>
          </ResponsiveWrapper>
          <Row style={{ minHeight: 300 }}>
            <Col
              xs={12}
              className="d-flex justify-content-center align-items-center p-0"
              style={{ marginLeft: hasBalance ? -12.5 : 0 }}
            >
              {hasBalance ? (
                <ProfileAssetsChart cGLD={cGLD} cUSD={cUSD} />
              ) : (
                <p className="text-truncate">No assets found</p>
              )}
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };
}

export default connector(ProfileAssets);

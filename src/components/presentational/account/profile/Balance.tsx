import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { getAccountAssets } from '../../../../data/actions/account';
import { getExchangeRates } from '../../../../data/actions/network';
import BalanceChart from './BalanceChart';
import fiatLight from '../../../../assets/png/fiatLight.png';
import coinsLight from '../../../../assets/png/coinsLight.png';
import goldCoin from '../../../../assets/png/goldCoin.png';
import greenCoin from '../../../../assets/png/greenCoin.png';

const mapState = (
  {
    network: {
      exchangeRates: { goldToDollars }
    }
  },
  ownProps
) => ({
  goldToDollars,
  ...ownProps
});
const mapDispatch = { getAccountAssets, getExchangeRates };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const buttonProps = {
  height: 32,
  paddingTop: 0,
  paddingBottom: 0,
  border: 'none',
  boxShadow: 'none'
};

class Balance extends PureComponent<Props, { type: string }> {
  constructor(props) {
    super(props);
    this.state = {
      type: 'fiat'
    };

    props.getExchangeRates();
  }

  setType = ({ currentTarget: { id } }) => this.setState({ type: id });

  generateDollarSeriesData = () => {
    const { assets, goldToDollars } = this.props;
    const goldDollars = assets.cGLD.multipliedBy(goldToDollars);
    const cumulativeDollars = assets.cUSD.plus(goldDollars).toFormat(2);

    return {
      dollarValue: cumulativeDollars,
      amountCGLD: null,
      amountCUSD: null,
      chartSeries: [
        {
          name: 'Dollar Value ($)',
          // TO DO: Fetch balances for previous X elections instead of using placeholders
          data: [cumulativeDollars, cumulativeDollars, cumulativeDollars, cumulativeDollars, cumulativeDollars]
        }
      ],
      chartSeriesColors: ['#3488ec']
    };
  };

  generateTokenSeriesData = () => {
    const { cGLD, cUSD } = this.props.assets;

    return {
      dollarValue: null,
      amountCGLD: cGLD,
      amountCUSD: cUSD,
      chartSeries: [
        {
          name: 'Amount (cGLD)',
          // TO DO: Fetch balances for previous X elections instead of using placeholders
          data: [cGLD, cGLD, cGLD, cGLD, cGLD]
        },
        {
          name: 'Amount (cUSD)',
          // TO DO: Fetch balances for previous X elections instead of using placeholders
          data: [cUSD, cUSD, cUSD, cUSD, cUSD]
        }
      ],
      chartSeriesColors: ['#fbcc5c', '#35D07F']
    };
  };

  render = () => {
    const { type } = this.state;
    const {
      assets: { cGLD, cUSD }
    } = this.props;
    const hasAssets = (cGLD && cUSD && !cGLD.isZero()) || !cUSD.isZero();
    const data = type === 'fiat' ? this.generateDollarSeriesData() : this.generateTokenSeriesData();
    const chartHeader =
      type === 'fiat' ? (
        <h2 style={{ color: '#3488ec' }}>${data.dollarValue}</h2>
      ) : (
        <h4>
          <div style={{ color: '#fbcc5c', marginBottom: 4 }}>
            <img src={goldCoin} height={18} /> {data.amountCGLD.toFixed(4)}
          </div>
          <div style={{ color: '#35D07F' }}>
            <img src={greenCoin} height={18} /> {data.amountCUSD.toFixed(4)}
          </div>
        </h4>
      );

    return (
      <Card style={{ height: 360, width: '100%' }}>
        <CardBody style={{ paddingBottom: 0 }}>
          <Row
            noGutters
            className="justify-content-between align-items-center"
            style={{ width: '100%', flexWrap: 'nowrap' }}
          >
            <Col xs={5}>
              <h4 className="card-title">Balance</h4>
            </Col>
            <Col lg={7} xs={7} className="d-flex justify-content-end" style={{ flexWrap: 'nowrap', paddingRight: 0 }}>
              <Button
                id="fiat"
                active={type === 'fiat'}
                disabled={!hasAssets}
                className="waves-effect mr-1"
                style={{
                  ...buttonProps,
                  backgroundColor: type === 'fiat' ? '#F9F8F9' : '#fff',
                  color: '#3488ec'
                }}
                onClick={this.setType}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <img src={fiatLight} height={24} alt="fiat" />
                </div>
              </Button>
              <Button
                id="coins"
                active={type === 'coins'}
                disabled={!hasAssets}
                className="waves-effect ml-1"
                style={{
                  ...buttonProps,
                  backgroundColor: type === 'coins' ? '#F9F8F9' : '#fff'
                }}
                onClick={this.setType}
              >
                <div className="d-flex align-items-center">
                  <img src={coinsLight} height={24} alt="coins" />
                </div>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col xs={12}>{chartHeader}</Col>
          </Row>
        </CardBody>
        <CardBody className="d-flex justify-content-center align-items-center" style={{ padding: 0 }}>
          <div style={{ width: '100%' }}>
            {hasAssets ? <BalanceChart series={data.chartSeries} seriesColors={data.chartSeriesColors} /> : <></>}
          </div>
        </CardBody>
      </Card>
    );
  };
}

export default connector(Balance);

import React, { PureComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { getAccountAssets } from '../../../../data/actions/account';
import { getExchangeRates } from '../../../../data/actions/network';
import BalanceChart from './BalanceChart';
import coinsLight from '../../../../assets/png/coinsLight.png';
import fiatLight from '../../../../assets/png/fiatLight.png';

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
    const cumulativeDollars = assets.cUSD.plus(goldDollars).toNumber();

    return {
      value: cumulativeDollars,
      chartSeries: [
        {
          name: 'Total Value ($)',
          // TO DO: Fetch balances for previous X elections instead of using placeholders
          data: [cumulativeDollars, cumulativeDollars, cumulativeDollars, cumulativeDollars, cumulativeDollars]
        }
      ]
    };
  };

  render = () => {
    const { type } = this.state;
    const {
      assets: { cGLD, cUSD }
    } = this.props;
    const hasAssets = (cGLD && cUSD && !cGLD.isZero()) || !cUSD.isZero();
    const data = type === 'fiat' ? this.generateDollarSeriesData() : this.generateDollarSeriesData();

    return (
      <Card>
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
                  backgroundColor: type === 'fiat' ? '#DDDDDD' : '#fff',
                  color: '#3488ec'
                }}
                onClick={this.setType}
              >
                <div className="d-flex justify-content-center align-items-center">
                  <i className="mdi mdi-cash-usd" style={{ fontSize: 20 }} />
                </div>
              </Button>
              <Button
                id="coins"
                active={type === 'coins'}
                disabled={!hasAssets}
                className="waves-effect ml-1"
                style={{
                  ...buttonProps,
                  backgroundColor: type === 'coins' ? '#DDDDDD' : '#fff'
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
            <Col xs={12}>
              <h1>{`$${data.value.toFixed(2)}`}</h1>
            </Col>
          </Row>
        </CardBody>
        <CardBody style={{ padding: 0 }}>{hasAssets ? <BalanceChart series={data.chartSeries} /> : <></>}</CardBody>
      </Card>
    );
  };
}

export default connector(Balance);

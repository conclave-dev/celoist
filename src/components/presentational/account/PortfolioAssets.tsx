import React, { memo, useState } from 'react';
import { Card, CardBody, Button, Row, Col } from 'reactstrap';
import BigNumber from 'bignumber.js';
import ApexSpline from '../charts/ApexSpline';
import PortfolioAssetExchanger from '../../presentational/account/PortfolioAssetExchanger';

const chartDataColors = ['#fbcc5c', '#35D07F'];
const chartData = [
  {
    name: 'cGLD',
    data: [32, 60, 34, 46, 34, 52, 41, 32, 60, 34]
  },
  {
    name: 'cUSD',
    data: [0, 25, 0, 0, 100, 0, 0, 0, 25, 0]
  }
];

const ResponsiveHeaderWrapper = ({ children }) => (
  <>
    <CardBody className="d-none d-lg-block" style={{ maxHeight: 76 }}>
      {children}
    </CardBody>
    <CardBody
      className="d-none d-lg-none d-xs-block d-flex justify-content-center"
      style={{ maxHeight: 76, paddingRight: 10, paddingLeft: 10 }}
    >
      {children}
    </CardBody>
  </>
);

const ResponsiveChartWrapper = ({ children }) => (
  <>
    <div className="d-none d-lg-block mt-2" style={{ width: '80%' }}>
      {children}
    </div>
    <div className="d-none d-lg-none d-xs-block d-flex justify-content-center mt-4" style={{ width: '100%' }}>
      {children}
    </div>
  </>
);

const PortfolioAssets = ({ cGLD, cUSD }: { cGLD: BigNumber; cUSD: BigNumber }) => {
  const [exchangerAssetSymbol, setExchangerAssetSymbol] = useState('');
  const clearExchangerAssetSymbol = () => setExchangerAssetSymbol('');

  return (
    <Card style={{ border: 'none', maxHeight: 628 }}>
      <ResponsiveHeaderWrapper>
        <Row
          noGutters
          className="justify-content-between align-items-center"
          style={{ width: '100%', flexWrap: 'nowrap' }}
        >
          <Col lg={6} xs={4} style={{ padding: 0 }}>
            <h4 className="card-title" style={{ marginTop: 0, marginBottom: 0 }}>
              Assets
            </h4>
          </Col>
          <Col lg={6} xs={8} className="d-flex justify-content-end" style={{ flexWrap: 'nowrap', paddingRight: 0 }}>
            <Button
              className="waves-effect waves-light mr-1"
              style={{
                color: '#FFF',
                backgroundColor: '#fbcc5c',
                border: 'none',
                height: 36,
                paddingTop: 0,
                paddingBottom: 0
              }}
              onClick={() => setExchangerAssetSymbol('cGLD')}
            >
              <span className="text-truncate">+ cGLD</span>
            </Button>
            <Button
              className="waves-effect waves-light ml-1"
              style={{
                color: '#FFF',
                backgroundColor: '#35D07F',
                border: 'none',
                height: 36,
                paddingTop: 0,
                paddingBottom: 0
              }}
              onClick={() => setExchangerAssetSymbol('cUSD')}
            >
              <span className="text-truncate">+ cUSD</span>
            </Button>
          </Col>
        </Row>
      </ResponsiveHeaderWrapper>
      <CardBody style={{ padding: 0, width: '100%' }} className="d-flex justify-content-center">
        {exchangerAssetSymbol &&
          (exchangerAssetSymbol === 'cGLD' ? (
            <PortfolioAssetExchanger
              cGLD={cGLD}
              cUSD={cUSD}
              assetSymbol="cGLD"
              clearExchangerAssetSymbol={clearExchangerAssetSymbol}
            />
          ) : (
            <PortfolioAssetExchanger
              cGLD={cGLD}
              cUSD={cUSD}
              assetSymbol="cUSD"
              clearExchangerAssetSymbol={clearExchangerAssetSymbol}
            />
          ))}
        <ResponsiveChartWrapper>
          <ApexSpline chartData={chartData} chartDataColors={chartDataColors} />
        </ResponsiveChartWrapper>
      </CardBody>
    </Card>
  );
};

export default memo(PortfolioAssets);

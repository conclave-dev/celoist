import React, { memo } from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import ApexSpline from '../charts/ApexSpline';

const chartDataColors = ['#fbcc5c', '#35D07F'];

const PortfolioAssets = ({ cGLD, cUSD }) => {
  const chartData = [
    {
      name: 'Gold (cGLD)',
      data: [32, 60, 34, 46, 34, 52, 41, 32, 60, 34]
    },
    {
      name: 'Dollars (cUSD)',
      data: [0, 25, 0, 0, 100, 0, 0, 0, 25, 0]
    }
  ];

  return (
    <Card style={{ border: 'none', maxHeight: 600 }}>
      <CardBody className="d-flex justify-content-between align-items-center">
        <h4 className="card-title" style={{ marginTop: 0, marginBottom: 0 }}>
          Assets
        </h4>
        <Button
          className="waves-effect waves-light"
          style={{
            color: '#FFF',
            backgroundColor: '#3488ec',
            border: 'none',
            height: 36,
            paddingTop: 0,
            paddingBottom: 0
          }}
        >
          Exchange
        </Button>
      </CardBody>
      <CardBody style={{ padding: 0 }} className="d-flex justify-content-center">
        <div style={{ width: '80%' }}>
          <ApexSpline chartData={chartData} chartDataColors={chartDataColors} />
        </div>
      </CardBody>
    </Card>
  );
};

export default memo(PortfolioAssets);

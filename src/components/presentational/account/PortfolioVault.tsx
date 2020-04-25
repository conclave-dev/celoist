import React, { memo } from 'react';
import { Card, CardBody } from 'reactstrap';
import ApexSpline from '../charts/ApexSpline';

const chartData = [
  {
    name: 'Votes',
    data: [0, 0, 0, 52, 42, 109, 100, 0, 0, 0]
  },
  {
    name: 'cGLD',
    data: [32, 60, 34, 46, 34, 52, 41, 32, 60, 34]
  },
  {
    name: 'cUSD',
    data: [0, 25, 0, 0, 100, 0, 0, 0, 25, 0]
  }
];
const chartDataColors = ['#3488ec', '#35D07F', '#fbcc5c'];

const PortfolioVault = ({ lockedGold, unlockedGold, pendingWithdrawal }) => (
  <Card style={{ height: 668 }}>
    <CardBody style={{ maxHeight: 70 }}>
      <h4 className="card-title" style={{ marginBottom: 0 }}>
        Vault
      </h4>
    </CardBody>
    <CardBody style={{ paddingRight: 0, paddingLeft: 0 }}>
      <ApexSpline chartData={chartData} chartDataColors={chartDataColors} />
    </CardBody>
  </Card>
);

export default memo(PortfolioVault);

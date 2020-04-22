import React, { memo } from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import ApexSpline from '../charts/ApexSpline';

const ProfileBalances = ({ votes, cGLD, cUSD }) => (
  <Col lg={7} xs={12}>
    <Card style={{ height: 668 }}>
      <CardBody style={{ maxHeight: 70 }}>
        <h4 className="card-title" style={{ marginBottom: 0 }}>
          Balances
        </h4>
      </CardBody>
      <CardBody>
        <p className="text-center font-italic">Previous 10 Elections</p>
      </CardBody>
    </Card>
  </Col>
);

export default memo(ProfileBalances);

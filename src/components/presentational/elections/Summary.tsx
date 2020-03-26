import React, { memo } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
// import SummarySpinner from '../reusable/SummarySpinner';
// import goldRewards from '../../../assets/png/goldRewards.png';
import gold from '../../../assets/png/gold.png';
import score from '../../../assets/png/score.png';

const Summary = () => (
  <Row>
    <Col xl="4" md="4">
      <Card className="bg-blue">
        <CardBody>
          <div className="float-right">
            <img src="" width={48} />
          </div>
          <h5 className="font-20 mt-0 pt-1">X</h5>
          <p className="text-muted mb-0">X</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="4" md="4">
      <Card className="bg-green">
        <CardBody>
          <div className="float-right">
            <img src={gold} width={48} />
          </div>
          <h5 className="font-20 mt-0 pt-1">0</h5>
          <p className="text-muted mb-0">Total Rewards (Previous Election)</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="4" md="4">
      <Card className="bg-gold">
        <CardBody>
          <div className="float-right">
            <img src={score} width={48} />
          </div>
          <h5 className="font-20 mt-0 pt-1">0</h5>
          <p className="text-muted mb-0">Average Score (Previous Election)</p>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default memo(Summary);

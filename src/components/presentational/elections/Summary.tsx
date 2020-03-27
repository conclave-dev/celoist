import React, { memo } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import goldCoin from '../../../assets/png/goldCoin.png';
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
            <img src={goldCoin} width={48} />
          </div>
          <h5 className="font-20 mt-0 pt-1">0</h5>
          <p className="text-muted mb-0">Total Rewards (Previous Election)</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="4" md="4">
      <Card className="bg-goldCoin">
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

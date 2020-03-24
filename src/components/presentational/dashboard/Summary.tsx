import React, { memo } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import goldRewards from '../../../assets/png/goldRewards.png';
import vote from '../../../assets/png/vote.png';
import proposal from '../../../assets/png/proposal.png';

const Summary = () => (
  <Row>
    <Col xl="4" md="4">
      <Card className="bg-red">
        <CardBody>
          <div className="float-right">
            <img src={goldRewards} width={48} />
          </div>
          <h5 className="font-20 mt-0 pt-1">{`X%`}</h5>
          <p className="text-muted mb-0">Annual Reward Percentage</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="4" md="4">
      <Card className="bg-green">
        <CardBody>
          <div className="float-right">
            <img src={vote} width={48} />
          </div>
          <h5 className="font-20 mt-0 pt-1">{`X`}</h5>
          <p className="text-muted mb-0">Current Election Votes</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="4" md="4">
      <Card className="bg-blue">
        <CardBody>
          <div className="float-right">
            <img src={proposal} width={48} />
          </div>
          <h5 className="font-20 mt-0 pt-1">{`X`}</h5>
          <p className="text-muted mb-0">Live Governance Proposals</p>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default memo(Summary);

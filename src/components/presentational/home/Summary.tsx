import React, { memo } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import SummarySpinner from '../reusable/SummarySpinner';
// import goldRewards from '../../../assets/png/goldRewards.png';
import vote from '../../../assets/png/vote.png';
import proposal from '../../../assets/png/proposal.png';

const Summary = ({
  votes,
  numProposals,
  networkInProgress
}: {
  votes: string;
  numProposals: number;
  networkInProgress: boolean;
}) => (
  <Row>
    {/**
      TODO: Calculate the annual reward %
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
     */}
    <Col xl="6" md="6">
      <Card className="bg-green">
        <CardBody>
          <div className="float-right">
            <img src={vote} width={48} />
          </div>
          {votes === '0' || networkInProgress ? (
            <SummarySpinner color="success" />
          ) : (
            <h5 className="font-20 mt-0 pt-1">{votes}</h5>
          )}
          <p className="text-muted mb-0">Election Votes</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="6" md="6">
      <Card className="bg-blue">
        <CardBody>
          <div className="float-right">
            <img src={proposal} width={48} />
          </div>
          {!numProposals || networkInProgress ? (
            <SummarySpinner color="primary" />
          ) : (
            <h5 className="font-20 mt-0 pt-1">{numProposals}</h5>
          )}
          <p className="text-muted mb-0">Governance Proposals</p>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default memo(Summary);

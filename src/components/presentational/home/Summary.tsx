import React, { memo } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import SummarySpinner from '../reusable/SummarySpinner';
// import goldRewards from '../../../assets/png/goldRewards.png';
import voteLight from '../../../assets/png/voteLight.png';
import proposalLight from '../../../assets/png/proposalLight.png';

const Summary = ({ votes, numProposals }: { votes: string; numProposals: number }) => (
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
            <img src={voteLight} width={48} />
          </div>
          <h5 className="font-20 mt-0 pt-1">{votes}</h5>
          <p className="text-muted mb-0">Election Votes</p>
        </CardBody>
      </Card>
    </Col>
    <Col xl="6" md="6">
      <Card className="bg-blue">
        <CardBody>
          <div className="float-right">
            <img src={proposalLight} width={48} />
          </div>
          <h5 className="font-20 mt-0 pt-1">{numProposals}</h5>
          <p className="text-muted mb-0">Governance Proposals</p>
        </CardBody>
      </Card>
    </Col>
  </Row>
);

export default memo(Summary);

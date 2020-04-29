import React, { memo } from 'react';
import { Progress, Row, Col } from 'reactstrap';
import Anchor from '../../../reusable/Anchor';

interface GroupContentProps {
  name: string;
  address: string;
  commission: string;
  votes: {
    value: number;
    text: string;
  };
  memberCount: string;
  score: string;
  scoreColor: string;
  groupVoterPayment: string;
}

const GroupContentDesktop = ({
  groupContentData: { name, address, commission, votes, memberCount, score, scoreColor, groupVoterPayment }
}: {
  groupContentData: GroupContentProps;
}) => (
  <Row noGutters className="align-items-center" style={{ flexWrap: 'nowrap' }}>
    <Col lg={2} className="text-truncate">
      <Anchor href={`https://baklava-blockscout.celo-testnet.org/address/${address}`} color="#3488ec">
        {name || address}
      </Anchor>
    </Col>
    <Col lg={2} className="text-truncate text-center">
      {commission}
    </Col>
    <Col lg={2} className="">
      <div className="d-flex justify-content-center align-items-center">
        <span className="text-truncate text-center mr-1">{groupVoterPayment}</span>
      </div>
    </Col>
    <Col lg={2} className="text-truncate text-center" style={{ color: scoreColor }}>
      {score}
    </Col>
    <Col lg={2} className="text-truncate text-center">
      {memberCount}
    </Col>
    <Col lg={2} style={{ position: 'relative', height: 30 }}>
      <Progress
        animated
        style={{ height: '100%', width: '100%', position: 'absolute' }}
        color="warning"
        className="text-truncate"
        value={votes.value}
      />
      <div
        className="d-flex justify-content-center align-items-center text-truncate"
        style={{ height: '100%', width: '100%', position: 'absolute', fontSize: 14 }}
      >
        {votes.text}
      </div>
    </Col>
  </Row>
);

export default memo(GroupContentDesktop);

import React, { memo } from 'react';
import { Progress, Row, Col } from 'reactstrap';
import Anchor from '../../../reusable/Anchor';
import GroupContentMobileLabels from './GroupContentMobileLabels';

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

const GroupContentMobile = ({
  groupContentData: { name, address, commission, votes, memberCount, score, scoreColor, groupVoterPayment },
  networkURL
}: {
  groupContentData: GroupContentProps;
  networkURL: string;
}) => (
  <Row noGutters style={{ flexWrap: 'nowrap' }} className="pt-3 pb-3">
    <GroupContentMobileLabels />
    <Col xs={6}>
      <Row noGutters style={{ height: 36 }} className="mb-2">
        <Anchor href={`${networkURL}/address/${address}`} color="#3488ec">
          {name || address}
        </Anchor>
      </Row>
      <Row noGutters style={{ height: 36 }} className="mb-2">
        <span className="text-truncate">{commission}</span>
      </Row>
      <Row noGutters style={{ height: 36 }} className="mb-2 align-items-center">
        <span className="text-truncate">{groupVoterPayment}</span>
      </Row>
      <Row noGutters style={{ height: 36, color: scoreColor }} className="mb-2">
        <span className="text-truncate">{score}</span>
      </Row>
      <Row noGutters style={{ height: 36 }} className="mb-2">
        <span className="text-truncate">{memberCount}</span>
      </Row>
      <Row noGutters style={{ position: 'relative', height: 36 }}>
        <Progress
          animated
          style={{ height: '75%', width: '95%', position: 'absolute' }}
          color="warning"
          className="text-truncate"
          value={votes.value}
        />
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: '75%', width: '95%', position: 'absolute', fontSize: 14 }}
        >
          <span className="text-truncate">{votes.text}</span>
        </div>
      </Row>
    </Col>
  </Row>
);

export default memo(GroupContentMobile);

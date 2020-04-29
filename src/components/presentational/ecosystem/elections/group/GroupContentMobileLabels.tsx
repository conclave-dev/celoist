import React, { memo } from 'react';
import { Row, Col } from 'reactstrap';

const GroupContentMobileLabels = () => (
  <Col xs={6}>
    <Row noGutters style={{ height: 36 }} className="mb-2 ">
      <span className="text-truncate">Name</span>
    </Row>
    <Row noGutters style={{ height: 36 }} className="mb-2">
      <span className="text-truncate">Commission</span>
    </Row>
    <Row noGutters style={{ height: 36 }} className="mb-2">
      <span className="text-truncate">Voter Rewards</span>
    </Row>
    <Row noGutters style={{ height: 36 }} className="mb-2">
      <span className="text-truncate">Score</span>
    </Row>
    <Row noGutters style={{ height: 36 }} className="mb-2">
      <span className="text-truncate">Members</span>
    </Row>
    <Row noGutters style={{ height: 36 }}>
      <span className="text-truncate">Votes</span>
    </Row>
  </Col>
);

export default memo(GroupContentMobileLabels);

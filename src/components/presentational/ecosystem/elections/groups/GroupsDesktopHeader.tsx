import React, { memo } from 'react';
import { Row, Col, ListGroupItem } from 'reactstrap';

import vote from '../../../../../assets/png/vote.png';
import group from '../../../../../assets/png/group.png';

const GroupsHeader = () => (
  <>
    <ListGroupItem className="d-none d-lg-block" style={{ borderTopWidth: 1 }}>
      <Row noGutters className="align-items-center pt-1 pb-1">
        <Col lg={2}>
          <img src={group} style={{ width: 24 }} alt="Group icon" className="mr-1" />
          <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
            Group
          </span>
        </Col>
        <Col lg={2} className="text-truncate text-center" style={{ fontWeight: 400, fontSize: 14 }}>
          Commission
        </Col>
        <Col lg={2} className="text-truncate text-center" style={{ fontWeight: 400, fontSize: 14 }}>
          Members
        </Col>
        <Col lg={2} className="text-truncate text-center" style={{ fontWeight: 400, fontSize: 14 }}>
          Voter Rewards
        </Col>
        <Col lg={2} className="text-truncate text-center" style={{ fontWeight: 400, fontSize: 14 }}>
          Score
        </Col>
        <Col lg={2}>
          <img src={vote} style={{ width: 24 }} alt="Votes icon" />
          <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
            Votes
          </span>
        </Col>
      </Row>
    </ListGroupItem>
    <ListGroupItem className="d-lg-none d-xs-block">
      <Row className="align-items-center">
        <Col xs={12}>
          <img src={group} style={{ width: 24 }} alt="Group icon" className="mr-1" />
          <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
            Group
          </span>
        </Col>
      </Row>
    </ListGroupItem>
  </>
);

export default memo(GroupsHeader);

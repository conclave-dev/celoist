import React, { memo } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

import vote from '../../../../assets/png/vote.png';
import group from '../../../../assets/png/group.png';

const Groups = ({ children }: { children: any }) => (
  <Col xl={12}>
    <ListGroup>
      <ListGroupItem>
        <Row className="align-items-center">
          <Col sm={7} xs={6}>
            <img src={group} style={{ width: 24 }} />
            <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
              Group
            </span>
          </Col>
          <Col sm={4} xs={4}>
            <img src={vote} style={{ width: 24 }} />
            <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
              Votes
            </span>
          </Col>
          <Col sm={1} xs={2} />
        </Row>
      </ListGroupItem>
      {children}
    </ListGroup>
  </Col>
);

export default memo(Groups);

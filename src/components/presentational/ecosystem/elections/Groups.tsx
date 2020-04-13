import React, { memo } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

import vote from '../../../../assets/png/vote.png';
import group from '../../../../assets/png/group.png';

const Groups = ({ children }: { children: JSX.Element | JSX.Element[] }) => (
  <Col xl={12}>
    <ListGroup>
      <ListGroupItem>
        <Row className="align-items-center">
          <Col xs={1} className="d-flex justify-content-center">
            <img src={group} style={{ width: 24 }} alt="Group icon" className="mr-1" />
          </Col>
          <Col xs={3}>
            <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
              Name
            </span>
          </Col>
          <Col xs={4}>
            <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
              Address
            </span>
          </Col>
          <Col xs={4}>
            <img src={vote} style={{ width: 24 }} alt="Votes icon" />
            <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
              Votes
            </span>
          </Col>
        </Row>
      </ListGroupItem>
      {children}
    </ListGroup>
  </Col>
);

export default memo(Groups);

import React, { memo } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';

import vote from '../../../../assets/png/vote.png';
import group from '../../../../assets/png/group.png';

const Groups = ({ children }: { children: any }) => (
  <Col xl={12}>
    <ListGroup>
      <ListGroupItem>
        <Row noGutters className="align-items-center">
          <Col xl={1} />
          <Col xl={7}>
            <img className="mr-1" src={group} width={24} />
            <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
              Group
            </span>
          </Col>
          <Col xl={4}>
            <img className="mr-1" src={vote} width={24} />
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

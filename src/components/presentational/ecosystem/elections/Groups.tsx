import React, { memo } from 'react';
import { Col, ListGroup } from 'reactstrap';
import Spinner from '../../reusable/Spinner';
import GroupsHeader from './GroupsHeader';
import GroupsContent from './GroupsContent';
import { GroupProps } from './types';

const Groups = (props: GroupProps) => (
  <Col>
    <ListGroup>
      <GroupsHeader />
      {props.allGroupIds.length ? (
        <GroupsContent {...props} />
      ) : (
        <Col xs={12}>
          <Spinner />
        </Col>
      )}
    </ListGroup>
  </Col>
);

export default memo(Groups);

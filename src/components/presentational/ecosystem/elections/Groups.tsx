import React, { memo } from 'react';
import { Col, ListGroup } from 'reactstrap';
import Spinner from '../../reusable/Spinner';
import GroupsDesktopHeader from './groups/GroupsDesktopHeader';
import GroupsContent from './groups/GroupsContent';
import { GroupProps } from './types';

const Groups = (props: GroupProps) => (
  <Col>
    <ListGroup>
      <GroupsDesktopHeader />
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

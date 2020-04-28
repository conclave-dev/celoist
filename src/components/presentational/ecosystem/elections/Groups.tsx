import React, { memo } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import Group from './Group';
import Spinner from '../../reusable/Spinner';
import { GroupsById, AllGroupIds, Config } from '../../../../data/types/elections';

import vote from '../../../../assets/png/vote.png';
import group from '../../../../assets/png/group.png';

const GroupsLargeScreens = () => (
  <ListGroupItem className="d-none d-lg-block">
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
        Score
      </Col>
      <Col lg={2} className="text-truncate text-center" style={{ fontWeight: 400, fontSize: 14 }}>
        Penalties
      </Col>
      <Col lg={2}>
        <img src={vote} style={{ width: 24 }} alt="Votes icon" />
        <span className="text-muted" style={{ fontWeight: 400, fontSize: 14 }}>
          Votes
        </span>
      </Col>
    </Row>
  </ListGroupItem>
);

const GroupsSmallScreens = () => (
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
);

const Groups = ({
  groupsById,
  allGroupIds,
  config
}: {
  groupsById: GroupsById;
  allGroupIds: AllGroupIds;
  config: Config;
}) => (
  <Col>
    <ListGroup>
      <GroupsLargeScreens />
      <GroupsSmallScreens />
      {allGroupIds.length ? (
        allGroupIds.map((groupId) => (
          <Group key={groupId} group={groupsById[groupId]} maxGroupSize={config.maxGroupSize} />
        ))
      ) : (
        <Col xs={12}>
          <Spinner />
        </Col>
      )}
    </ListGroup>
  </Col>
);

export default memo(Groups);

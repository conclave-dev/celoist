import React, { memo, useState } from 'react';
import { Progress, ListGroupItem, Button, Collapse, Row, Col } from 'reactstrap';
import { Group as GroupType, GroupMember } from '../../../data/reducers/types';
import { formatBigInt } from '../../../util/numbers';

const Group = ({
  group,
  members,
  votes,
  voteCapacityFilled,
  index
}: {
  group: GroupType;
  members: { [key: string]: GroupMember };
  votes: string;
  voteCapacityFilled: number;
  index: number;
}) => {
  const [toggledGroupIndex, setToggleGroupIndex] = useState(0);
  const setGroupIndex = () => {
    let newIndex = index;

    if (index === toggledGroupIndex) {
      newIndex = 0;
    }

    return setToggleGroupIndex(newIndex);
  };

  return (
    <ListGroupItem>
      <Row noGutters className="align-items-center">
        <Col xl={5} className="d-flex align-items-center">
          <Button outline id="members" color="muted" className="btn btn-link waves-effect mr-2" onClick={setGroupIndex}>
            <i className="fas fa-caret-down" style={{ color: '#35D07F' }} />
          </Button>
          <span className="text-truncate" style={{ display: 'inline-block' }}>
            {group.name || `${group.address}`}
          </span>
        </Col>
        <Col xl={3}>
          <Progress animated striped style={{ maxWidth: 200, height: 24 }} max={100} color="warning" value={voteCapacityFilled}>
            {votes}
          </Progress>
        </Col>
        <Col xl={2}>$0</Col>
        <Col xl={2}>0%</Col>
        <Collapse key={`hidden-${group.address}`} isOpen={index === toggledGroupIndex}>
          Hello
        </Collapse>
      </Row>
    </ListGroupItem>
  );
};

export default memo(Group);

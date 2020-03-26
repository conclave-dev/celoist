import React, { memo, useState } from 'react';
import { Progress, ListGroupItem, Button, Collapse, Row, Col } from 'reactstrap';
import { Group as GroupType, GroupMember } from '../../../data/reducers/types';

const Group = ({
  group,
  members,
  index
}: {
  group: GroupType;
  members: { [key: string]: GroupMember };
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
        <Col xl={3}>
          <Progress style={{ maxWidth: 200 }} color="warning" value={78} />
        </Col>
        <Col xl={5} className="d-flex align-items-center">
          <span className="text-truncate" style={{ maxWidth: 300, display: 'inline-block' }}>
            {group.name || `${group.address}`}
          </span>
          <Button
            id="members"
            color="primary"
            size="sm"
            className="btn btn-link waves-effect ml-3"
            onClick={setGroupIndex}
          >
            <i className="fas fa-caret-down" style={{ color: 'white' }} />
          </Button>
        </Col>
        <Col xl={2}>$0</Col>
        <Col xl={2}>
          <Progress multi>
            <Progress bar color="success" value={100} />
          </Progress>
        </Col>
        <Collapse key={`hidden-${group.address}`} isOpen={index === toggledGroupIndex}>
          Hello
        </Collapse>
      </Row>
    </ListGroupItem>
  );
};

export default memo(Group);

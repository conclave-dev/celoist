import React, { memo, useState } from 'react';
import { Progress, ListGroupItem, Button, Row, Col } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import { fetchGroupDetails, setSelectedGroupId } from '../../../../data/actions/elections';
import { Group as GroupType } from '../../../../data/types/elections';
import { makeGroupDetailsSelector } from '../../../../data/selectors/elections';
import GroupDetails from './GroupDetails';

const groupSelector = makeGroupDetailsSelector();

const mapState = (state, ownProps) => groupSelector(state, ownProps);
const mapDispatch = { fetchGroupDetails, setSelectedGroupId };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Group = ({
  key,
  group,
  votes,
  voteCapacityFilled,
  groupDetails,
  fetchGroupDetails
}: {
  key: string;
  group: GroupType;
  votes: string;
  voteCapacityFilled: number;
  groupDetails: PropsFromRedux['groupDetails'];
  fetchGroupDetails: PropsFromRedux['fetchGroupDetails'];
}) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <>
      <ListGroupItem key={key}>
        <Row className="align-items-center" style={{ flexWrap: 'nowrap' }}>
          <Col sm={7} xs={6} className="text-truncate">
            {group.address}
          </Col>
          <Col sm={4} xs={4}>
            <Progress style={{ height: 36 }} max={100} color="warning" value={voteCapacityFilled}>
              {votes}
            </Progress>
          </Col>
          <Col sm={1} xs={2}>
            <Button
              outline
              id={group.address}
              color="muted"
              className="btn btn-link waves-effect"
              style={{ margin: 0 }}
              onClick={() => {
                setShowButton(!showButton);

                if (!groupDetails) {
                  return fetchGroupDetails(group.address);
                }
              }}
            >
              <i
                className={`mdi mdi-magnify-${showButton ? 'minus' : 'plus'}`}
                style={{ color: showButton ? '#35D07F' : '#9ca8b3', width: 12 }}
              />
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
      {showButton && <GroupDetails groupDetails={groupDetails} />}
    </>
  );
};

export default connector(memo(Group));

import React, { memo } from 'react';
import { Progress, ListGroupItem, Button, Row, Col } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import { fetchGroupMembers, fetchGroupDetails } from '../../../../data/actions/network';
import { Group as GroupType } from '../../../../data/reducers/types';
import GroupDetails from './GroupDetails';

const mapState = ({ network: { groupMembers } }) => ({ groupMembers });
const mapDispatch = { fetchGroupMembers, fetchGroupDetails };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux;

const Group = ({
  key,
  group,
  votes,
  voteCapacityFilled,
  selectedGroupAddress,
  handleGroupClick
}: {
  key: string;
  group: GroupType;
  votes: string;
  voteCapacityFilled: number;
  selectedGroupAddress: string;
  handleGroupClick: ({ currentTarget: { id: groupAddress } }: { currentTarget: { id: any } }) => void;
}) => {
  const isSelected = selectedGroupAddress === group.address;
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
              onClick={event => {
                return handleGroupClick(event);
                // return fetchGroupMembers();
              }}
            >
              <i
                className={`mdi mdi-magnify-${isSelected ? 'minus' : 'plus'}`}
                style={{ color: isSelected ? '#35D07F' : '#9ca8b3', width: 12 }}
              />
            </Button>
          </Col>
        </Row>
      </ListGroupItem>
      <GroupDetails group={group} isSelected={isSelected} />
    </>
  );
};

export default connector(memo(Group));

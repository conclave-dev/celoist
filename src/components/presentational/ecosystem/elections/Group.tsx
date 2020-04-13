import React, { memo, useState } from 'react';
import { Progress, ListGroupItem, Button, Row, Col } from 'reactstrap';
import { connect, ConnectedProps } from 'react-redux';
import BigNumber from 'bignumber.js';
import { fetchGroupDetails, setSelectedGroupId } from '../../../../data/actions/elections';
import { Group as GroupType } from '../../../../data/types/elections';
import { makeGroupDetailsSelector } from '../../../../data/selectors/elections';
import { formatBigInt } from '../../../../util/numbers';
import GroupDetails from './GroupDetails';
import Anchor from '../../reusable/Anchor';

const groupSelector = makeGroupDetailsSelector();

const mapState = (state, ownProps) => groupSelector(state, ownProps);
const mapDispatch = { fetchGroupDetails, setSelectedGroupId };
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const Group = ({
  key,
  group,
  votes,
  capacity,
  groupDetails,
  fetchGroupDetails
}: {
  key: string;
  group: GroupType;
  votes: BigNumber;
  capacity: BigNumber;
  groupDetails: PropsFromRedux['groupDetails'];
  fetchGroupDetails: PropsFromRedux['fetchGroupDetails'];
}) => {
  const [showButton, setShowButton] = useState(false);

  return (
    <>
      <ListGroupItem key={key}>
        <Row className="align-items-center" style={{ flexWrap: 'nowrap' }}>
          <Col xs={1} className="d-flex justify-content-center">
            <Button
              outline
              id={group.address}
              color="muted"
              className="btn btn-link waves-effect"
              style={{ margin: 0, paddingRight: 0, paddingLeft: 0 }}
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
          <Col xs={3} className="text-truncate">
            {group.name || 'N/A'}
          </Col>
          <Col xs={4} className="text-truncate">
            <Anchor href={`https://baklava-blockscout.celo-testnet.org/address/${group.address}`} color="#3488ec">
              {group.address}
            </Anchor>
          </Col>
          <Col xs={4}>
            <div style={{ position: 'relative', height: 36 }}>
              <Progress
                animated
                style={{ height: '100%', width: '100%', position: 'absolute' }}
                color="warning"
                className="text-truncate"
                value={votes
                  .dividedBy(capacity)
                  .multipliedBy(100)
                  .toNumber()}
              />
              <div
                className="d-flex justify-content-center align-items-center text-truncate"
                style={{ height: '100%', width: '100%', position: 'absolute', fontSize: 14 }}
              >
                {formatBigInt(votes)}
              </div>
            </div>
          </Col>
        </Row>
      </ListGroupItem>
      {showButton && <GroupDetails groupDetails={groupDetails} />}
    </>
  );
};

export default connector(memo(Group));

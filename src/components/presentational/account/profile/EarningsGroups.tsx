import React, { memo } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Button } from 'reactstrap';
import BigNumber from 'bignumber.js';
import Anchor from '../../reusable/Anchor';
import EarningsGroupChart from './EarningsGroupChart';
import { getTokenAmountFromUint256 } from '../../../../util/numbers';

const truncateAddress = (address: string) => {
  const start = address.substring(0, 4);
  const end = address.substring(address.length - 4);

  return `${start}...${end}`;
};

const GroupIdentifier = ({ name, address }: { name: string; address: string }) => (
  <h5>
    <Anchor href={`https://baklava-blockscout.celo-testnet.org/address/${address}/celo`}>
      {name || truncateAddress(address)}
    </Anchor>
  </h5>
);

const GroupEarnings = ({ earnings }: { earnings: { earnings: BigNumber; epochNumber: number }[] }) => (
  <Button
    className="text-truncate text-center"
    style={{
      color: '#FFF',
      backgroundColor: '#fbcc5c',
      border: 'none',
      boxShadow: 'none',
      fontSize: 18
    }}
  >
    +$
    {getTokenAmountFromUint256(earnings.reduce((acc, { earnings }) => acc.plus(earnings), new BigNumber(0))).toFormat(
      2
    )}
  </Button>
);

const EarningsGroup = ({ group, groupId }: { group: any; groupId: string }) => (
  <Row style={{ flexWrap: 'nowrap', height: '100%' }} className="align-items-center">
    <Col xs={3}>
      <GroupIdentifier name={group.name} address={groupId} />
    </Col>
    <Col xs={6} className="d-flex justify-content-center align-items-center">
      <EarningsGroupChart earnings={group.earnings} />
    </Col>
    <Col xs={3} className="d-flex justify-content-end align-items-center">
      <GroupEarnings earnings={group.earnings} />
    </Col>
  </Row>
);

const EarningsGroups = ({ earnings }: { earnings: any }) => {
  return earnings.allGroupIds.length ? (
    <ListGroup flush style={{ width: '100%' }} className="d-flex align-items-center">
      {earnings.allGroupIds.map((groupId, index) => {
        return (
          <div key={groupId}>
            <ListGroupItem
              style={{
                height: 100,
                border: 'none',
                paddingTop: 0,
                paddingBottom: 0,
                paddingLeft: 12,
                paddingRight: 12
              }}
            >
              <EarningsGroup group={earnings.byGroupId[groupId]} groupId={groupId} />
            </ListGroupItem>
            <hr
              style={{
                marginTop: 8,
                marginBottom: 8
              }}
            />
            {earnings.allGroupIds[index + 1] && (
              <hr
                style={{
                  marginTop: 8,
                  marginBottom: 8
                }}
              />
            )}
          </div>
        );
      })}
    </ListGroup>
  ) : (
    <p className="text-center">This account has no earnings</p>
  );
};

export default memo(EarningsGroups);

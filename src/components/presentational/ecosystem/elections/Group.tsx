import React, { memo } from 'react';
import { Progress, ListGroupItem, Row, Col } from 'reactstrap';
import { Group as GroupType, Config } from '../../../../data/types/elections';
import { formatSlashingMultiplier, formatCommission, formatVotes, formatScore } from '../../../../util/numbers';
import Anchor from '../../reusable/Anchor';

const GroupLargeScreens = ({
  group: { name, address, commission, slashingMultiplier, votes, capacity, memberAddresses, score },
  maxGroupSize
}: {
  group: GroupType;
  maxGroupSize: Config['maxGroupSize'];
}) => (
  <ListGroupItem className="d-none d-lg-block">
    <Row noGutters className="align-items-center" style={{ flexWrap: 'nowrap' }}>
      <Col lg={2} className="text-truncate">
        <Anchor href={`https://baklava-blockscout.celo-testnet.org/address/${address}`} color="#3488ec">
          {name || address}
        </Anchor>
      </Col>
      <Col lg={2} className="text-truncate text-center">
        {formatCommission(commission)}%
      </Col>
      <Col lg={2} className="text-truncate text-center">
        <span>{`${memberAddresses.length}/${maxGroupSize || '?'}`}</span>
      </Col>
      <Col lg={2} className="text-truncate text-center">
        {formatScore(score)}/100
      </Col>
      <Col lg={2} className="text-truncate text-center">
        {formatSlashingMultiplier(slashingMultiplier)}x
      </Col>
      <Col lg={2} style={{ position: 'relative', height: 30 }}>
        <Progress
          animated
          style={{ height: '100%', width: '100%', position: 'absolute' }}
          color="warning"
          className="text-truncate"
          value={votes.dividedBy(capacity).multipliedBy(100).toNumber()}
        />
        <div
          className="d-flex justify-content-center align-items-center text-truncate"
          style={{ height: '100%', width: '100%', position: 'absolute', fontSize: 14 }}
        >
          {formatVotes(votes)}
        </div>
      </Col>
    </Row>
  </ListGroupItem>
);

const GroupSmallScreens = ({
  group: { name, address, commission, slashingMultiplier, votes, capacity, memberAddresses, score },
  maxGroupSize
}: {
  group: GroupType;
  maxGroupSize: Config['maxGroupSize'];
}) => (
  <ListGroupItem className="d-block d-lg-none">
    <Row noGutters style={{ flexWrap: 'nowrap' }} className="pt-3 pb-3">
      <Col xs={6}>
        <Row noGutters style={{ height: 36 }} className="mb-2 ">
          <span className="text-truncate">Name</span>
        </Row>
        <Row noGutters style={{ height: 36 }} className="mb-2">
          <span className="text-truncate">Commission</span>
        </Row>
        <Row noGutters style={{ height: 36 }} className="mb-2">
          <span className="text-truncate">Score</span>
        </Row>
        <Row noGutters style={{ height: 36 }} className="mb-2">
          <span className="text-truncate">Penalties</span>
        </Row>
        <Row noGutters style={{ height: 36 }} className="mb-2">
          <span className="text-truncate">Members</span>
        </Row>
        <Row noGutters style={{ height: 36 }}>
          <span className="text-truncate">Votes</span>
        </Row>
      </Col>
      <Col xs={6}>
        <Row noGutters style={{ height: 36 }} className="mb-2">
          <Anchor href={`https://baklava-blockscout.celo-testnet.org/address/${address}`} color="#3488ec">
            {name || address}
          </Anchor>
        </Row>
        <Row noGutters style={{ height: 36 }} className="mb-2">
          <span className="text-truncate">{formatCommission(commission)}%</span>
        </Row>
        <Row noGutters style={{ height: 36 }} className="mb-2">
          <span className="text-truncate">{formatScore(score)}/100</span>
        </Row>
        <Row noGutters style={{ height: 36 }} className="mb-2">
          <span className="text-truncate">{formatSlashingMultiplier(slashingMultiplier)}x</span>
        </Row>
        <Row noGutters style={{ height: 36 }} className="mb-2">
          <span className="text-truncate">{`${memberAddresses.length}/${maxGroupSize || '?'}`}</span>
        </Row>
        <Row noGutters style={{ position: 'relative', height: 36 }}>
          <Progress
            animated
            style={{ height: '75%', width: '95%', position: 'absolute' }}
            color="warning"
            className="text-truncate"
            value={votes.dividedBy(capacity).multipliedBy(100).toNumber()}
          />
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '75%', width: '95%', position: 'absolute', fontSize: 14 }}
          >
            <span className="text-truncate">{formatVotes(votes)}</span>
          </div>
        </Row>
      </Col>
    </Row>
  </ListGroupItem>
);

const Group = ({ group, maxGroupSize }: { group: GroupType; maxGroupSize: Config['maxGroupSize'] }) => {
  return (
    <>
      <GroupLargeScreens group={group} maxGroupSize={maxGroupSize} />
      <GroupSmallScreens group={group} maxGroupSize={maxGroupSize} />
    </>
  );
};

export default memo(Group);

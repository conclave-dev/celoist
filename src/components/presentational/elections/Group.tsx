import React, { memo } from 'react';
import { Progress } from 'reactstrap';
import BigNumber from 'bignumber.js';
import { Link } from 'react-router-dom';
import Anchor from '../reusable/Anchor';
import Members from './Members';
import { Group as GroupType } from '../../../data/reducers/types';
import { formatBigInt } from '../../../util/numbers';

const Group = ({ name, address, votes, capacity }: GroupType) => {
  const formattedVotes = formatBigInt(votes.toNumber());
  // console.log('capacity.isZero()', capacity.isZero());
  if (votes.toNumber() === 0) {
    console.log('\n IS ZERO');
    console.log(votes.c);
    console.log(address);
    console.log('IS ZERO \n');
  }

  console.log();
  // console.log('capacity', capacity);
  // console.log('capacity.isZero() ? votes.toNumber() : capacity', capacity.isZero() ? votes.toNumber() : capacity);
  const formattedCapacity = `(${votes
    .dividedBy(capacity.isZero() ? votes.toNumber() : capacity)
    .integerValue()
    .toNumber() * 100}% capacity)`;

  return (
    <tr>
      <td style={{ paddingLeft: 0, verticalAlign: 'middle' }}>
        <Progress style={{ maxWidth: 200 }} color="warning" value={78} />
      </td>
      <td style={{ paddingLeft: 0, verticalAlign: 'middle' }}>
        <div className="text-truncate" style={{ maxWidth: 300, display: 'inline-block' }}>
          {name || `${address}`}
        </div>{' '}
        <i className="fas fa-caret-down" />
      </td>
      <td style={{ paddingLeft: 0, verticalAlign: 'middle' }}>$0</td>
      <td style={{ paddingLeft: 0, verticalAlign: 'middle' }}>
        <Progress multi>
          <Progress bar color="success" value={100} />
        </Progress>
      </td>
    </tr>
  );
};

export default memo(Group);

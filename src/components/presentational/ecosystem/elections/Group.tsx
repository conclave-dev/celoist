import React, { memo } from 'react';
import { ListGroupItem } from 'reactstrap';
import BigNumber from 'bignumber.js';
import { Group as GroupType, Config } from '../../../../data/types/elections';
import { formatTokens, formatCommission, formatVotes, formatScore } from '../../../../util/numbers';
import GroupContentDesktop from './group/GroupContentDesktop';
import GroupContentMobile from './group/GroupContentMobile';

const determineScoreColor = (score) => {
  switch (true) {
    case score.isLessThan(34):
      return '#fb7c6d';
    case score.isLessThan(67):
      return '#fbcc5c';
    default:
      return '#35D07F';
  }
};

const Group = ({ group, maxGroupSize }: { group: GroupType; maxGroupSize: Config['maxGroupSize'] }) => {
  const { name, address, commission, groupVoterPayment, score, capacity, votes, memberAddresses } = group;
  const groupContentData = {
    name,
    address,
    commission: `${formatCommission(commission)}%`,
    groupVoterPayment: formatTokens(groupVoterPayment),
    score: `${formatScore(score)}%`,
    scoreColor: determineScoreColor(new BigNumber(formatScore(score))),
    votes: {
      value: votes.dividedBy(capacity).multipliedBy(100).toNumber(),
      text: formatVotes(votes)
    },
    memberCount: `${memberAddresses.length}/${maxGroupSize || '?'}`
  };

  return (
    <>
      <ListGroupItem className="d-none d-lg-block">
        <GroupContentDesktop groupContentData={groupContentData} />
      </ListGroupItem>
      <ListGroupItem className="d-block d-lg-none">
        <GroupContentMobile groupContentData={groupContentData} />
      </ListGroupItem>
    </>
  );
};

export default memo(Group);

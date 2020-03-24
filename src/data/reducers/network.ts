import BigNumber from 'bignumber.js';
import { FETCH_GROUPS } from '../actions/actions';
import { initialStateDecorator, evalActionPayload } from '../util/reducers';
import { Election } from './types';

const network = {
  eligibleGroups: [],
  ineligibleGroups: [],
  totalVotes: new BigNumber(0)
};

const initialState: Election = initialStateDecorator(network);

export default (state = initialState, action) => {
  const { type } = action;

  const fetchGroups = (state, { groups }) => {
    const { eligibleGroups, ineligibleGroups, totalVotes } = groups.reduce(
      (acc, group) => {
        if (group.votes.isZero()) {
          return acc;
        }

        return {
          eligibleGroups: [...acc.eligibleGroups, ...(group.eligible ? [group] : [])],
          ineligibleGroups: [...acc.ineligibleGroups, ...(group.eligible ? [] : [group])],
          totalVotes: BigNumber.sum(acc.totalVotes, group.votes)
        };
      },
      {
        eligibleGroups: [...network.eligibleGroups],
        ineligibleGroups: [...network.ineligibleGroups],
        totalVotes: network.totalVotes
      }
    );

    return {
      ...state,
      eligibleGroups,
      ineligibleGroups,
      totalVotes: totalVotes
    };
  };

  switch (type) {
    case FETCH_GROUPS:
      return evalActionPayload(state, action, fetchGroups);
    default:
      return state;
  }
};

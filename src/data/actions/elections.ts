import { FETCH_ELECTION, VOTE_GROUP, REVOKE_VOTE, ACTIVATE_PENDING_VOTE } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import {
  populateElection,
  fetchElectionConfig,
  fetchElectionSummary,
  voteGroup,
  revokeVote,
  activatePendingVote
} from '../fetch/elections';

const fetchElection = (blockNumber?: number) => async (dispatch, getState) => {
  handleInit(dispatch, FETCH_ELECTION);

  try {
    const { networkID } = getState().network;
    const { groupsById, allGroupIds } = await populateElection(networkID, blockNumber);

    // Fetch election summary data and merge groupsById with voter rewards data
    const { summary, groupsByIdWithRewards } = await fetchElectionSummary(networkID, groupsById);

    return handleData(dispatch, FETCH_ELECTION, {
      groupsById: groupsByIdWithRewards,
      allGroupIds,
      config: await fetchElectionConfig(networkID),
      summary
    });
  } catch (err) {
    return handleError(dispatch, FETCH_ELECTION, err);
  }
};

const voteValidatorGroup = (amount, groupAddress) => async (dispatch, getState) => {
  handleInit(dispatch, VOTE_GROUP);

  try {
    const { ledger } = getState().ledger;
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash }
    } = await voteGroup(amount, groupAddress, ledger);

    return handleData(dispatch, VOTE_GROUP, {
      blockHash,
      blockNumber,
      cumulativeGasUsed,
      gasUsed,
      transactionHash
    });
  } catch (err) {
    return handleError(dispatch, VOTE_GROUP, err);
  }
};

const activatePendingGroupVote = () => async (dispatch, getState) => {
  handleInit(dispatch, ACTIVATE_PENDING_VOTE);

  try {
    const { ledger } = getState().ledger;
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash }
    } = await activatePendingVote(ledger);

    return handleData(dispatch, ACTIVATE_PENDING_VOTE, {
      blockHash,
      blockNumber,
      cumulativeGasUsed,
      gasUsed,
      transactionHash
    });
  } catch (err) {
    return handleError(dispatch, ACTIVATE_PENDING_VOTE, err);
  }
};

const revokeGroupVote = (amount, groupAddress) => async (dispatch, getState) => {
  handleInit(dispatch, REVOKE_VOTE);

  try {
    const { ledger } = getState().ledger;
    const {
      txReceipt: { blockHash, blockNumber, cumulativeGasUsed, gasUsed, transactionHash }
    } = await revokeVote(amount, groupAddress, ledger);

    return handleData(dispatch, REVOKE_VOTE, {
      blockHash,
      blockNumber,
      cumulativeGasUsed,
      gasUsed,
      transactionHash
    });
  } catch (err) {
    return handleError(dispatch, REVOKE_VOTE, err);
  }
};

export { fetchElection, voteValidatorGroup, activatePendingGroupVote, revokeGroupVote };

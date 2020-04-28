import { FETCH_ELECTION } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { populateElection, fetchElectionConfig, fetchElectionSummary } from '../fetch/elections';

const fetchElection = (blockNumber?: number) => async (dispatch) => {
  handleInit(dispatch, FETCH_ELECTION);

  try {
    const { groupsById, allGroupIds } = await populateElection(blockNumber);

    // Fetch election summary data and merge groupsById with voter rewards data
    const { summary, groupsByIdWithRewards } = await fetchElectionSummary(groupsById);

    return handleData(dispatch, FETCH_ELECTION, {
      groupsById: groupsByIdWithRewards,
      allGroupIds,
      config: await fetchElectionConfig(),
      summary
    });
  } catch (err) {
    return handleError(dispatch, FETCH_ELECTION, err);
  }
};

export { fetchElection };

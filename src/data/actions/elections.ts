import { FETCH_ELECTION } from './actions';
import { handleInit, handleData, handleError } from '../util/actions';
import { populateElection } from '../fetch/elections';

const fetchElection = (blockNumber?: number) => async dispatch => {
  handleInit(dispatch, FETCH_ELECTION);

  try {
    const { groupsById, allGroupIds } = await populateElection(blockNumber);
    return handleData(dispatch, FETCH_ELECTION, {
      groupsById,
      allGroupIds
    });
  } catch (err) {
    return handleError(dispatch, FETCH_ELECTION, { err });
  }
};

export { fetchElection };

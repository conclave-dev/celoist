import * as Sentry from '@sentry/browser';

const handleInit = (dispatch, type) =>
  dispatch({
    type,
    status: 100,
    message: 'Init'
  });

const handleData = (dispatch, type, data) =>
  dispatch({
    type,
    status: 200,
    message: 'Success',
    ...data
  });

const handleError = (dispatch, type, error) => {
  if (process.env.NODE_ENV !== 'production') {
    throw error;
  }

  return dispatch({
    type,
    status: error.status || 400,
    message: error.message || 'Unspecified error'
  });
};

export { handleInit, handleData, handleError };

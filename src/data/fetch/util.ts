import { backend } from './api';

const defaultOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Connection: 'Keep-Alive'
  }
};

// Resolves the promise from calling `json` and returns the value of `data`
const unpackResponse = async (response: Response) => {
  try {
    const { data } = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

const backendFetch = async (endpoint: string, data: object = {}) => {
  try {
    return unpackResponse(
      await fetch(`${backend}/${endpoint}`, {
        ...defaultOptions,
        body: JSON.stringify(data)
      })
    );
  } catch (err) {
    return err;
  }
};

export { backendFetch, defaultOptions };

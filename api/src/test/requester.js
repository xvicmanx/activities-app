// @flow

import fetch from 'node-fetch';

const fetchJSON = (endpoint: string, data: Object) => fetch(
  endpoint,
  data,
).then((res) => res.json());

const Requester = {
  get: (endpoint: string, headers: Object = {}) => fetchJSON(
    endpoint,
    {
      method: 'GET',
      headers,
    },
  ),
  post: (endpoint: string, payload: Object = {}, headers: Object = {}) => {
    const result = fetchJSON(
      endpoint,
      {
        method: 'POST',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );
    return result;
  },
  put: (endpoint: string, payload: Object = {}, headers: Object = {}) => {
    const result = fetchJSON(
      endpoint,
      {
        method: 'PUT',
        headers: {
          ...headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );
    return result;
  },
  delete: (endpoint: string, headers: Object = {}) => {
    const result = fetchJSON(
      endpoint,
      {
        method: 'DELETE',
        headers,
      },
    );
    return result;
  },
};

export default Requester;

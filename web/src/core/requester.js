// @flow

import { readToken } from '../entities/users/redux/UsersActions';

type Data = {
  path: string,
  method?: 'POST' | 'GET' | 'PUT' | 'DELETE',
  payload?: Object,
};

const getHost = (): string => {
  const { protocol, host } = window.location;
  const { PORT, NODE_ENV } = process.env;
  return NODE_ENV === 'production'
    ? `${protocol}//${host}/api`
    : `http://localhost:${PORT || 4500}`;
};

const getHeaders = (): Object => {
  const token = readToken();

  let headers: Object = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const requester = async (data: Data): Promise<Object> => {
  try {
    const response = await fetch(`${getHost()}${data.path}`, {
      method: data.method || 'GET',
      headers: getHeaders(),
      body: JSON.stringify(data.payload),
    }).then((res) => res.json());
    return response;
  } catch (error) {
    return {
      success: false,
      message: 'Unexpected Error',
    };
  }
};

export default requester;

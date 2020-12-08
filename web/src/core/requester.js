// @flow

type Data = {
  token?: string,
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

const getHeaders = (token?: string): Object => {
  let headers: Object = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const requester = (data: Data): Promise<Object> => fetch(`${getHost()}${data.path}`, {
  method: data.method || 'GET',
  headers: getHeaders(data.token),
  body: JSON.stringify(data.payload),
}).then((res) => res.json());

export default requester;

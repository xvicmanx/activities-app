import { LOCAL_HOST } from '@env';

const requester = async (data) => {
  const { token, path, method, payload } = data;
  console.log('data: ', data);
  const HOST = LOCAL_HOST;

  let headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${HOST}${path}`, {
      method: method || 'GET',
      headers,
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    return res;
  } catch (err) {
    console.log(err);
  }
};

export default requester;

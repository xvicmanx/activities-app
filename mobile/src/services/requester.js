export const requester = async ({ token, path, method, payload }) => {
  //TODO: READ FROM ENV
  const HOST = 'http://10.0.0.30:4500';

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

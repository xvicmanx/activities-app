const requester = async (data) => {
  const { protocol, host } = window.location;
  const { PORT, NODE_ENV } = process.env;
  const HOST =
    NODE_ENV === 'production'
      ? `${protocol}//${host}/api`
      : `http://localhost:${PORT || 4500}`;

  const { token, path, method, payload } = data;

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

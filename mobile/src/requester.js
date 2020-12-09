import { API } from '@env';

const requester = async ({ token, path, method, payload, image }) => {
  let headers = {};

  if (!image) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const requestOptions = {
    method: method || 'GET',
    headers,
  };

  if (image) {
    requestOptions.body = createFormData(payload);
  } else {
    requestOptions.body = JSON.stringify(payload);
  }

  try {
    const response = await fetch(`${API}${path}`, requestOptions);

    if (!response.ok) {
      throw new Error(`response.ok = false (status: ${response.status})`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error,
    };
  }
};

const createFormData = (photo) => {
  const data = new FormData();

  data.append('file', {
    name: photo.fileName,
    type: photo.type,
    uri: photo.uri,
  });

  return data;
};

export default requester;

import { Platform } from 'react-native';
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
    const resData = await fetch(`${API}${path}`, requestOptions);
    const res = await resData.json();

    return res;
  } catch (error) {
    console.log(error);
  }
};

const createFormData = (photo) => {
  const data = new FormData();

  data.append('file', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
  });

  return data;
};

export default requester;

import { requester } from './requester';

const fetUserInfo = async (userId, token) => {
  return await requester({ path: `/users/find/${userId}`, token });
};

export default {
  fetUserInfo,
};

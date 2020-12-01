import requester from '../../requester';

const checkUserInfo = async (token) => {
  return await requester({ path: '/users/current', token });
};

const loginUser = async (email, password) => {
  return await requester({
    path: '/users/login',
    method: 'POST',
    payload: {
      email,
      password,
    },
  });
};

const fetUserById = async (userId, token) => {
  return await requester({ path: `/users/find/${userId}`, token });
};

export default {
  loginUser,
  checkUserInfo,
  fetUserById,
};

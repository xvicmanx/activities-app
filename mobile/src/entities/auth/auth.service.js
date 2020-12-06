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

export default {
  loginUser,
  checkUserInfo,
};

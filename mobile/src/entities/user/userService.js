import requester from '../../requester';

const updatePassword = async (user) => {
  return await requester({
    path: `/users/change-password`,
    method: 'POST',
    token: user.token,
    payload: {
      email: user.email,
      password: '123456',
    },
  });
};

export default {
  updatePassword,
};

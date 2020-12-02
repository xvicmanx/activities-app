import requester from '../../requester';

const updatePassword = async (passwordsData, token) => {
  return await requester({
    path: `/users/change-password`,
    method: 'PUT',
    token,
    payload: {
      previousPassword: passwordsData.previousPassword,
      password: passwordsData.password,
      confirmPassword: passwordsData.confirmPassword,
    },
  });
};

export default {
  updatePassword,
};

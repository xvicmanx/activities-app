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

const updateDescription = async (description, token) => {
  return await requester({
    path: `/users/update-information`,
    method: 'PUT',
    token,
    payload: { description },
  });
};

export default {
  updatePassword,
  updateDescription,
};

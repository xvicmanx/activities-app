import requester from '../../requester';

const fetUserById = async (userId, token) => {
  return await requester({ path: `/users/find/${userId}`, token });
};

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

const uploadImage = async (imageData, token) => {
  return await requester({
    path: `/users/update-profile-picture`,
    method: 'PUT',
    token,
    payload: imageData,
    image: true,
  });
};

export default {
  updatePassword,
  updateDescription,
  uploadImage,
  fetUserById,
};

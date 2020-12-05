import requester from '../../../../core/requester';

const loginUser = async (email, password) => {
  const request = {
    path: '/users/login',
    method: 'POST',
    payload: { email, password }
  };

  return await requester(request);
};

export default loginUser;

import requester from '../../../../core/requester';

const loadUserFromToken = async (token) => {
  const request = {
    path: '/users/current',
    token
  };

  return await requester(request);
};

export default loadUserFromToken;

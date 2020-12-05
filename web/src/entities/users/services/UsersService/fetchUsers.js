import requester from '../../../../core/requester';

const fetchUsers = async (token) => {
  const request = {
    path: '/users/list',
    token
  };

  return await requester(request);
};

export default fetchUsers;

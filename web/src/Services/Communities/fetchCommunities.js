import requester from '../requester';

const fetchCommunities = async (token) => {
  const request = {
    path: '/communities/list',
    token
  };

  return await requester(request);
};

export default fetchCommunities;

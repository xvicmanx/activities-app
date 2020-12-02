import requester from '../requester';

const fetchActivities = async (token) => {
  const request = {
    path: '/communities/list',
    token
  };

  return await requester(request);
};

export default fetchActivities;

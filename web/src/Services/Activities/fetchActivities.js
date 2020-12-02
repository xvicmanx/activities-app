import requester from '../requester';

const fetchActivities = async (token) => {
  const request = {
    path: '/activities/list',
    token
  };

  return await requester(request);
};

export default fetchActivities;

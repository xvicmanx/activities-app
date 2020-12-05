import requester from '../requester';

const fetchActivities = async (token, id) => {
  const request = {
    path: `/communities/find/${id}`,
    token
  };

  return await requester(request);
};

export default fetchActivities;

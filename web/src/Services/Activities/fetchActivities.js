import requester from '../requester';

const fetchActivities = async (token) => requester({
  path: '/activities/list',
  token,
});

export default fetchActivities;

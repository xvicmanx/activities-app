import { requester } from './requester';

const getActivities = async (token) => {
  return await requester({ path: '/activities/pending', token });
};

export default { getActivities };

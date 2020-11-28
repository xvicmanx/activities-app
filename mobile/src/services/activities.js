import { requester } from './requester';

const getActivities = async (token) => {
  return await requester({ path: '/activities/pending', token });
};

const getParticipants = async (activityId, token) => {
  return await requester({
    path: `/activities/${activityId}/participants-list`,
    token,
  });
};

export default { getActivities, getParticipants };

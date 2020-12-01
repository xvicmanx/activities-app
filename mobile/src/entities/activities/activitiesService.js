import requester from '../../requester';

const getActivities = async (token) => {
  return await requester({ path: '/activities/pending', token });
};

const getParticipants = async (activityId, token) => {
  return await requester({
    path: `/activities/${activityId}/participants-list`,
    token,
  });
};

const joinActivity = async (activityId, token) => {
  return await requester({
    path: `/activities/${activityId}/join`,
    method: 'PUT',
    token,
  });
};

const unjoinActivity = async (activityId, token) => {
  return await requester({
    path: `/activities/${activityId}/unjoin`,
    method: 'PUT',
    token,
  });
};

export default { getActivities, getParticipants, unjoinActivity, joinActivity };

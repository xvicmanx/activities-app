import requester from '../requester';

const updateActivity = (payload, token) => requester({
  path: `/activities/${payload.id}`,
  method: 'PUT',
  payload,
  token,
});

export default updateActivity;

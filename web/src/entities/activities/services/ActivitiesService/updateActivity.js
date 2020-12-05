import requester from '../../../../core/requester';

const updateActivity = (payload, token) => requester({
  path: `/activities/${payload.id}/update`,
  method: 'PUT',
  payload,
  token,
});

export default updateActivity;

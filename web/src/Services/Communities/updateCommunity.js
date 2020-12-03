import requester from '../requester';

const updateCommunity = (payload, token) => requester({
  path: `/communities/${payload.id}/update`,
  method: 'PUT',
  payload,
  token,
});

export default updateCommunity;

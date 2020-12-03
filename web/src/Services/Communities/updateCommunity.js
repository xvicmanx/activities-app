import requester from '../requester';

const updateCommunity = (payload, token) => requester({
  path: `/communities/${payload.id}`,
  method: 'PUT',
  payload,
  token,
});

export default updateCommunity;

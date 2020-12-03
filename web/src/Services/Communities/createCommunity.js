import requester from '../requester';

const createCommunity = (payload, token) => requester({
  path: '/communities',
  method: 'POST',
  payload,
  token,
});

export default createCommunity;

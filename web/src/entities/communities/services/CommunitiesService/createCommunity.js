import requester from '../../../../core/requester';

const createCommunity = (payload, token) => requester({
  path: '/communities/create',
  method: 'POST',
  payload,
  token,
});

export default createCommunity;

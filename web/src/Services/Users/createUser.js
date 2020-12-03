import requester from '../requester';

const createUser = (payload, token) => requester({
  path: '/users/create',
  method: 'POST',
  payload,
  token,
});

export default createUser;

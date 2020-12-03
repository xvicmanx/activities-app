import requester from '../requester';

const createActivity = (payload, token) => requester({
  path: '/activities/create',
  method: 'POST',
  payload,
  token,
});

export default createActivity;

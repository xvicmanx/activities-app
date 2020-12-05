import requester from '../../../../core/requester';

const createActivity = (payload, token) => requester({
  path: '/activities/create',
  method: 'POST',
  payload,
  token,
});

export default createActivity;

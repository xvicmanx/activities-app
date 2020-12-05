import requester from '../../../../core/requester';

const updateUser = (payload, token) => requester({
  path: `/users/${payload.id}/update`,
  method: 'PUT',
  payload,
  token,
});

export default updateUser;

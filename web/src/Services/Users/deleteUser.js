import requester from '../requester';

const deleteUser = (id, token) => requester({
  path: `/users/${id}/delete`,
  method: 'DELETE',
  token,
});

export default deleteUser;

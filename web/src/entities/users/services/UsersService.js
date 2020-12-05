import requester from '../../../core/requester';

export default {
  loginUser: (email, password) =>
    requester({
      path: '/users/login',
      method: 'POST',
      payload: { email, password },
    }),
  loadUserFromToken: (token) =>
    requester({
      path: '/users/current',
      token,
    }),
  fetchUsers: (token) =>
    requester({
      path: '/users/list',
      token,
    }),
  createUser: (payload, token) =>
    requester({
      path: '/users/create',
      method: 'POST',
      payload,
      token,
    }),
  updateUser: (payload, token) =>
    requester({
      path: `/users/${payload.id}/update`,
      method: 'PUT',
      payload,
      token,
    }),
  deleteUser: (id, token) =>
    requester({
      path: `/users/${id}/delete`,
      method: 'DELETE',
      token,
    }),
};

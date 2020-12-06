// @flow

import requester from '../../../core/requester';

const UsersService = {
  loginUser: (email: string, password: string): Promise<Object> =>
    requester({
      path: '/users/login',
      method: 'POST',
      payload: { email, password },
    }),
  loadUserFromToken: (token: string): Promise<Object> =>
    requester({
      path: '/users/current',
      token,
    }),
  fetchUsers: (token: string, queryOptions: string = ''): Promise<Object> =>
    requester({
      path: `/users/list?options=${queryOptions}`,
      token,
    }),
  createUser: (payload: Object, token: string): Promise<Object> =>
    requester({
      path: '/users/create',
      method: 'POST',
      payload,
      token,
    }),
  updateUser: (payload: Object, token: string): Promise<Object> =>
    requester({
      path: `/users/${payload.id}/update`,
      method: 'PUT',
      payload,
      token,
    }),
  deleteUser: (id: string | number, token: string): Promise<Object> =>
    requester({
      path: `/users/${id}/delete`,
      method: 'DELETE',
      token,
    }),
};

export default UsersService;

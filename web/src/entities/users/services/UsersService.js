// @flow

import requester from '../../../core/requester';

const UsersService = {
  loginUser: (email: string, password: string): Promise<Object> =>
    requester({
      path: '/users/login',
      method: 'POST',
      payload: { email, password },
    }),
  loadSignedInUser: (): Promise<Object> =>
    requester({ path: '/users/current' }),
  fetchUsers: (queryOptions: string = ''): Promise<Object> =>
    requester({ path: `/users/list?options=${queryOptions}` }),
  createUser: (payload: Object): Promise<Object> =>
    requester({
      path: '/users/create',
      method: 'POST',
      payload,
    }),
  updateUser: (payload: Object): Promise<Object> =>
    requester({
      path: `/users/${payload.id}/update`,
      method: 'PUT',
      payload,
    }),
  deleteUser: (id: string | number): Promise<Object> =>
    requester({
      path: `/users/${id}/delete`,
      method: 'DELETE',
    }),
};

export default UsersService;

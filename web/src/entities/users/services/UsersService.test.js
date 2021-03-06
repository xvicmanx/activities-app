import React from 'react';
import { encode } from '../../../core/helpers';
import UsersService from './UsersService';

jest.mock('../../../core/requester');

import requester from '../../../core/requester';

describe('UsersService', () => {
  beforeEach(() => {
    requester.mockClear();
    requester.mockImplementation(() => Promise.resolve({ success: true }));
  });

  describe('loadSignedInUser', () => {
    it('works as expected', async () => {
      const result = await UsersService.loadSignedInUser();

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({ path: '/users/current' });
    });
  });

  describe('loginUser', () => {
    it('works as expected', async () => {
      const result = await UsersService.loginUser('john@test.com', 'test4321!');

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/users/login',
        method: 'POST',
        payload: {
          email: 'john@test.com',
          password: 'test4321!',
        },
      });
    });
  });

  describe('fetchUsers', () => {
    it('works as expected', async () => {
      const queryOptions = encode({ name: 'test' });
      const result = await UsersService.fetchUsers(queryOptions);

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/users/list?options=eyJuYW1lIjoidGVzdCJ9',
      });
    });

    it('works as expected when options are not passed', async () => {
      const result = await UsersService.fetchUsers();

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/users/list?options=',
      });
    });
  });

  describe('createUser', () => {
    it('works as expected', async () => {
      const payload = { title: 'test' };
      const result = await UsersService.createUser(payload);

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/users/create',
        method: 'POST',
        payload,
      });
    });
  });

  describe('updateUser', () => {
    it('works as expected', async () => {
      const payload = { id: 1, title: 'test' };
      const result = await UsersService.updateUser(payload);

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/users/1/update',
        method: 'PUT',
        payload,
      });
    });
  });

  describe('deleteUser', () => {
    it('works as expected', async () => {
      const result = await UsersService.deleteUser(1);

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/users/1/delete',
        method: 'DELETE',
      });
    });
  });
});

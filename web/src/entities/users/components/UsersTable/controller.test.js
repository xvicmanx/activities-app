import React from 'react';

import Controller from './controller';

jest.mock('../../redux/UsersActions');
jest.mock('../../services/UsersService');

import UsersService from '../../services/UsersService';
import { readToken } from '../../redux/UsersActions';

describe('UsersTable controller', () => {
  const users = [
    {
      id: 1,
      title: 'Test activity 1',
      description: 'test 1',
    },
    {
      id: 2,
      title: 'Test activity 2',
      description: 'test 2',
    },
  ];

  beforeEach(() => {
    readToken.mockClear();
    readToken.mockImplementation(() => 'test-token');

    UsersService.fetchUsers.mockClear();
    UsersService.fetchUsers.mockImplementation(() =>
      Promise.resolve({ users, total: users.length })
    );

    UsersService.createUser.mockClear();
    UsersService.createUser.mockImplementation(() =>
      Promise.resolve({ success: true })
    );

    UsersService.updateUser.mockClear();
    UsersService.updateUser.mockImplementation(() =>
      Promise.resolve({ success: true })
    );

    UsersService.deleteUser.mockClear();
    UsersService.deleteUser.mockImplementation(() =>
      Promise.resolve({ success: true })
    );
  });

  describe('fetchItems', () => {
    it('works as expected', async () => {
      const options = {
        activePage: 1,
        itemsPerPage: 10,
        queryRules: [],
      };

      const result = await Controller.fetchItems(options);

      expect(result).toEqual({
        items: users,
        total: users.length,
      });
      expect(UsersService.fetchUsers).toHaveBeenCalledTimes(1);
      expect(UsersService.fetchUsers).toHaveBeenCalledWith(
        'test-token',
        'eyJhY3RpdmVQYWdlIjoxLCJpdGVtc1BlclBhZ2UiOjEwLCJxdWVyeVJ1bGVzIjpbXX0='
      );
    });
  });

  describe('create', () => {
    it('works as expected', async () => {
      const user = {
        id: 1,
        name: 'John',
      };

      const result = await Controller.create(user);

      expect(result).toEqual({ success: true });
      expect(UsersService.createUser).toHaveBeenCalledTimes(1);
      expect(UsersService.createUser).toHaveBeenCalledWith(user, 'test-token');
    });

    it('handles as expected unexpected errors', async () => {
      const user = {
        id: 1,
        name: 'John',
      };

      UsersService.createUser.mockImplementation(() =>
        Promise.reject(new Error('Unexpected error'))
      );
      const result = await Controller.create(user);

      expect(result).toEqual({ success: false, message: 'Unexpected error' });
      expect(UsersService.createUser).toHaveBeenCalledTimes(1);
      expect(UsersService.createUser).toHaveBeenCalledWith(user, 'test-token');
    });
  });

  describe('update', () => {
    it('works as expected', async () => {
      const user = {
        id: 1,
        name: 'John',
      };

      const result = await Controller.update(user);

      expect(result).toEqual({ success: true });
      expect(UsersService.updateUser).toHaveBeenCalledTimes(1);
      expect(UsersService.updateUser).toHaveBeenCalledWith(user, 'test-token');
    });

    it('handles as expected unexpected errors', async () => {
      const user = {
        id: 1,
        name: 'John',
      };

      UsersService.updateUser.mockImplementation(() =>
        Promise.reject(new Error('Unexpected error'))
      );
      const result = await Controller.update(user);

      expect(result).toEqual({ success: false, message: 'Unexpected error' });
      expect(UsersService.updateUser).toHaveBeenCalledTimes(1);
      expect(UsersService.updateUser).toHaveBeenCalledWith(user, 'test-token');
    });
  });

  describe('delete', () => {
    it('works as expected', async () => {
      const user = {
        id: 1,
        name: 'John',
      };

      const result = await Controller.delete(user);

      expect(result).toEqual({ success: true });
      expect(UsersService.deleteUser).toHaveBeenCalledTimes(1);
      expect(UsersService.deleteUser).toHaveBeenCalledWith(
        user.id,
        'test-token'
      );
    });

    it('handles as expected unexpected errors', async () => {
      const user = {
        id: 1,
        name: 'John',
      };

      UsersService.deleteUser.mockImplementation(() =>
        Promise.reject(new Error('Unexpected error'))
      );
      const result = await Controller.delete(user);

      expect(result).toEqual({ success: false, message: 'Unexpected error' });
      expect(UsersService.deleteUser).toHaveBeenCalledTimes(1);
      expect(UsersService.deleteUser).toHaveBeenCalledWith(
        user.id,
        'test-token'
      );
    });
  });
});

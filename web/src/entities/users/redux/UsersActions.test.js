import React from 'react';

import {
  loadUserFromToken,
  loginUser,
  logOutUser,
  fetchUsers,
  readToken,
} from './UsersActions';

jest.mock('browser-cookies');
jest.mock('../services/UsersService');

import UsersService from '../services/UsersService';
import cookies from 'browser-cookies';

describe('UsersActions', () => {
  const token = 'test-token';
  const user = {
    id: 1,
    name: 'John',
  };
  const users = [user];

  beforeEach(() => {
    UsersService.fetchUsers
      .mockImplementation(() => Promise.resolve({ users, success: true }))
      .mockClear();

    UsersService.loginUser
      .mockImplementation(() => Promise.resolve({ user, token, success: true }))
      .mockClear();

    UsersService.loadUserFromToken
      .mockImplementation(() => Promise.resolve({ user, token, success: true }))
      .mockClear();

    cookies.set.mockClear();
    cookies.erase.mockClear();
    cookies.get.mockImplementation(() => token).mockClear();
  });

  describe('fetchUsers', () => {
    describe('When success', () => {
      it('works as expected', async () => {
        const dispatch = jest.fn();

        await fetchUsers(token)(dispatch);

        expect(UsersService.fetchUsers).toHaveBeenCalledTimes(1);
        expect(UsersService.fetchUsers).toHaveBeenCalledWith(token);

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_LOADING_STATE',
          payload: true,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS',
          payload: users,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_LOADING_STATE',
          payload: false,
        });
      });
    });

    describe('When not success', () => {
      it('works as expected', async () => {
        const dispatch = jest.fn();
        UsersService.fetchUsers.mockImplementation(() =>
          Promise.resolve({ message: 'Error!', success: false })
        );

        await fetchUsers(token)(dispatch);

        expect(UsersService.fetchUsers).toHaveBeenCalledTimes(1);
        expect(UsersService.fetchUsers).toHaveBeenCalledWith(token);

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_LOADING_STATE',
          payload: true,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_ERROR',
          payload: 'Error!',
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_LOADING_STATE',
          payload: false,
        });
      });
    });
  });

  describe('loginUser', () => {
    const email = 'john@test.com';
    const password = '654321';

    describe('When success', () => {
      it('works as expected', async () => {
        const dispatch = jest.fn();

        await loginUser(email, password)(dispatch);

        expect(UsersService.loginUser).toHaveBeenCalledTimes(1);
        expect(UsersService.loginUser).toHaveBeenCalledWith(email, password);

        expect(cookies.set).toHaveBeenCalledTimes(1);
        expect(cookies.set).toHaveBeenCalledWith('jwt', token, { expires: 1 });

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_LOADING_STATE',
          payload: true,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_CURRENT_USER',
          payload: {
            ...user,
            token,
          },
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_LOADING_STATE',
          payload: false,
        });
      });
    });

    describe('When not success', () => {
      it('works as expected', async () => {
        const dispatch = jest.fn();
        UsersService.loginUser.mockImplementation(() =>
          Promise.resolve({ message: 'Error!', success: false })
        );

        await loginUser(email, password)(dispatch);

        expect(UsersService.loginUser).toHaveBeenCalledTimes(1);
        expect(UsersService.loginUser).toHaveBeenCalledWith(email, password);

        expect(cookies.set).toHaveBeenCalledTimes(0);

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_LOADING_STATE',
          payload: true,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USER_ERROR',
          payload: 'Error!',
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_LOADING_STATE',
          payload: false,
        });
      });
    });
  });

  describe('loadUserFromToken', () => {
    describe('When success', () => {
      it('works as expected', async () => {
        const dispatch = jest.fn();

        await loadUserFromToken({
          token,
          shouldLoadToken: true,
        })(dispatch);

        expect(UsersService.loadUserFromToken).toHaveBeenCalledTimes(1);
        expect(UsersService.loadUserFromToken).toHaveBeenCalledWith(token);

        expect(cookies.erase).toHaveBeenCalledTimes(1);
        expect(cookies.erase).toHaveBeenCalledWith('jwt');

        expect(cookies.set).toHaveBeenCalledTimes(1);
        expect(cookies.set).toHaveBeenCalledWith('jwt', token, { expires: 1 });

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_LOADING_STATE',
          payload: true,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_CURRENT_USER',
          payload: {
            ...user,
            token,
          },
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_LOADING_STATE',
          payload: false,
        });
      });
    });

    describe('When not success', () => {
      it('works as expected', async () => {
        const dispatch = jest.fn();
        UsersService.loadUserFromToken.mockImplementation(() =>
          Promise.resolve({ message: 'Error!', success: false })
        );

        await loadUserFromToken({
          token,
          shouldLoadToken: true,
        })(dispatch);

        expect(UsersService.loadUserFromToken).toHaveBeenCalledTimes(1);
        expect(UsersService.loadUserFromToken).toHaveBeenCalledWith(token);

        expect(cookies.set).toHaveBeenCalledTimes(0);
        expect(cookies.erase).toHaveBeenCalledTimes(1);
        expect(cookies.erase).toHaveBeenCalledWith('jwt');

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_LOADING_STATE',
          payload: true,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USER_ERROR',
          payload: 'Error!',
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_USERS_LOADING_STATE',
          payload: false,
        });
      });
    });

    it('can be prevented from loading', async () => {
      const dispatch = jest.fn();

      await loadUserFromToken({
        token,
        shouldLoadToken: false,
      })(dispatch);

      expect(UsersService.loadUserFromToken).toHaveBeenCalledTimes(0);
      expect(cookies.set).toHaveBeenCalledTimes(0);
      expect(cookies.erase).toHaveBeenCalledTimes(0);
      expect(dispatch).toHaveBeenCalledTimes(0);
    });
  });

  describe('logOutUser', () => {
    it('works as expected', async () => {
      const dispatch = jest.fn();

      await logOutUser()(dispatch);

      expect(cookies.erase).toHaveBeenCalledTimes(1);
      expect(cookies.erase).toHaveBeenCalledWith('jwt');

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'LOG_OUT_CURRENT_USER',
      });
    });
  });

  describe('readToken', () => {
    it('works as expected', async () => {
      const dispatch = jest.fn();

      const result = await readToken();

      expect(cookies.get).toHaveBeenCalledTimes(1);
      expect(cookies.get).toHaveBeenCalledWith('jwt');
      expect(result).toEqual(token);
    });
  });
});

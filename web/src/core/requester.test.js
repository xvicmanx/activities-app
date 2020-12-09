import requester from './requester';

jest.mock('../entities/users/redux/UsersActions');

import { readToken } from '../entities/users/redux/UsersActions';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
);

describe('requester', () => {
  beforeEach(() => {
    global.fetch.mockClear();
  });

  describe('Token provided', () => {
    it('works as expected', async () => {
      readToken.mockClear().mockImplementation(() => 'test-token');
      const result = await requester({
        path: '/test-path',
        payload: { name: 'test' },
        token: 'test-token',
      });
      expect(result).toEqual({ success: true });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4500/test-path',
        {
          body: '{"name":"test"}',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-token',
          },
          method: 'GET',
        }
      );
    });
  });

  describe('Token not provided', () => {
    it('works as expected', async () => {
      readToken.mockClear().mockImplementation(() => null);
      const result = await requester({
        path: '/test-path',
        method: 'POST',
        payload: { name: 'test' },
      });
      expect(result).toEqual({ success: true });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4500/test-path',
        {
          body: '{"name":"test"}',
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        }
      );
    });
  });

  it('handles unexpected errors properly', async () => {
    readToken.mockClear().mockImplementation(() => null);
    global.fetch = jest.fn(() => Promise.reject('Error'));
    const result = await requester({
      path: '/test-path',
      method: 'POST',
      payload: { name: 'test' },
    });

    expect(result).toEqual({ success: false, message: 'Unexpected Error' });
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:4500/test-path',
      {
        body: '{"name":"test"}',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      }
    );
  });
});

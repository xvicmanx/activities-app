import requester from './requester';

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
      const result = await requester({
        path: '/test-path',
        payload: { name: 'test' },
        token: 'test-token'
      });
      expect(result).toEqual({ success: true });
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:4500/test-path',
        {
          body: '{"name":"test"}',
          headers: {
            "Content-Type": 'application/json',
            Authorization: 'Bearer test-token',
          },
          method: 'GET',
        },
      );
    });
  });

  describe('Token not provided', () => {
    it('works as expected', async () => {
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
            "Content-Type": 'application/json'
          },
          method: 'POST',
        },
      );
    });
  });
});

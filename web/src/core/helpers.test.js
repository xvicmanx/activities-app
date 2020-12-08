import { throwErrorWhenNotSuccess } from './helpers';

describe('helpers', () => {
  describe('throwErrorWhenNotSuccess', () => {
    it('works as expected on success', async () => {
      const testFn = jest.fn(() => Promise.resolve({ success: true }));
      const result = await throwErrorWhenNotSuccess(testFn)({ id: 1 });
      expect(result).toEqual({ success: true });
      expect(testFn).toHaveBeenCalledTimes(1);
      expect(testFn).toHaveBeenCalledWith({ id: 1 });
    });

    it('works as expected on failure', async () => {
      const testFn = jest.fn(() =>
        Promise.resolve({ success: false, message: 'Error!' })
      );
      expect(throwErrorWhenNotSuccess(testFn)({ id: 1 })).rejects.toEqual(
        new Error('Error!')
      );
    });
  });
});

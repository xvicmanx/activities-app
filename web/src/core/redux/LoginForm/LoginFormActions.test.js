import React from 'react';

import { handleChange } from './LoginFormActions';

describe('LoginFormActions', () => {
  describe('handleChange', () => {
    it('works as expected', async () => {
      const dispatch = jest.fn();

      await handleChange({
        target: {
          name: 'test',
          value: 'test-value',
        },
      })(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith({
        type: 'HANDLE_CHANGE',
        payload: { name: 'test', value: 'test-value' },
      });
    });
  });
});

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { DescriptionRenderer, PasswordRenderer } from './renderers';

describe('CommunitiesTable renderers', () => {
  describe('DescriptionRenderer', () => {
    it('renders properly', () => {
      const renderer = new ShallowRenderer();
      const result = renderer.render(
        <DescriptionRenderer
          field={{
            name: 'test-name',
            value: 'test-value',
            onChange: jest.fn(),
          }}
        />
      );
      expect(result).toMatchSnapshot();
    });
  });
});

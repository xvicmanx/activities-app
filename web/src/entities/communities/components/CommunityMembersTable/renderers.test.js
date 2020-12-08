import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { CoordinatesSelectRenderer, MembersSelectRenderer } from './renderers';

describe('CommunityMembersTable renderers', () => {
  describe('MembersSelectRenderer', () => {
    it('renders properly', () => {
      const renderer = new ShallowRenderer();
      const result = renderer.render(
        <MembersSelectRenderer
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

  describe('CoordinatesSelectRenderer', () => {
    it('renders properly', () => {
      const renderer = new ShallowRenderer();
      const result = renderer.render(
        <CoordinatesSelectRenderer
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

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LoadingIndicator from './';

describe('LoadingIndicator', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<LoadingIndicator />);
    expect(result).toMatchSnapshot();
  });
});

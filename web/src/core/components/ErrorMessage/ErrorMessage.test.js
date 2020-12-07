import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import ErrorMessage from './';

describe('ErrorMessage', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<ErrorMessage text="Error!" />);
    expect(result).toMatchSnapshot();
  });
});

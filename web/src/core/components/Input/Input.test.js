import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Input from './Input';

describe('Input', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<Input className="test" value="foo" />);
    expect(result).toMatchSnapshot();
  });
});

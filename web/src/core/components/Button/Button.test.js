import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Button from './Button';

describe('Button', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<Button className="test">Hello</Button>);
    expect(result).toMatchSnapshot();
  });
});

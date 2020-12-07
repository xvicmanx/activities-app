import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Message from './Message';

describe('Message', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<Message>Hello my friend!</Message>);
    expect(result).toMatchSnapshot();
  });
});

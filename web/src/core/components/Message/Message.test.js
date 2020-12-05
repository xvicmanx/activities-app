import React from 'react';
import renderer from 'react-test-renderer';
import Message from './Message';

describe('Message', () => {
  it('renders properly', () => {
    const component = renderer.create(
      <Message>Hello my friend!</Message>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
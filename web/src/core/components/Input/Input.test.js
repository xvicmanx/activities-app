import React from 'react';
import renderer from 'react-test-renderer';
import Input from './Input';

describe('Input', () => {
  it('renders properly', () => {
    const component = renderer.create(
      <Input className="test" value="foo" />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
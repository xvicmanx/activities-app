import React from 'react';
import renderer from 'react-test-renderer';
import Button from './Button';

describe('Button', () => {
  it('renders properly', () => {
    const component = renderer.create(<Button className="test">Hello</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

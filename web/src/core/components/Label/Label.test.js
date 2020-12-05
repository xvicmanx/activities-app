import React from 'react';
import renderer from 'react-test-renderer';
import Label from './Label';

describe('Label', () => {
  it('renders properly', () => {
    const component = renderer.create(
      <Label>Test</Label>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
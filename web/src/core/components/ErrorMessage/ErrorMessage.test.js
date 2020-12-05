import React from 'react';
import renderer from 'react-test-renderer';
import ErrorMessage from './';

describe('ErrorMessage', () => {
  it('renders properly', () => {
    const component = renderer.create(
      <ErrorMessage>Error!</ErrorMessage>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
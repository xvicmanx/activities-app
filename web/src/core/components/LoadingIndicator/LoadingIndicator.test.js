import React from 'react';
import renderer from 'react-test-renderer';
import LoadingIndicator from './';

describe('LoadingIndicator', () => {
  it('renders properly', () => {
    const component = renderer.create(
      <LoadingIndicator />,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
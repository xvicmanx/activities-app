import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import BooleanDropdown from './BooleanDropdown';

describe('BooleanDropdown', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(
      <BooleanDropdown
        name="test-name"
        value="test-value"
        onChange={jest.fn()}
      />
    );
    expect(result).toMatchSnapshot();
  });
});

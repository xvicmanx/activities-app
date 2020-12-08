import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import FormField from './FormField';

describe('FormField', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const onClick = jest.fn()
    const result = renderer.render(<FormField label="test">Field</FormField>);
    expect(result).toMatchSnapshot();
  });
});

import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Form from './Form';

describe('Form', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const onClick = jest.fn()
    const result = renderer.render(<Form>Test</Form>);
    expect(result).toMatchSnapshot();
  });
});

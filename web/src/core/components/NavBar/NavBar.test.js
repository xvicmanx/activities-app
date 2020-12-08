import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import NavBar from './NavBar';

describe('NavBar', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const onClick = jest.fn();
    const result = renderer.render(<NavBar onLogoutClick={onClick} />);
    expect(result).toMatchSnapshot();
  });
});

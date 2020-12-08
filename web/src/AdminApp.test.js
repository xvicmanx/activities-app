import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import AdminApp from './AdminApp';

jest.mock('./useUserFromToken');

import useUserFromToken from './useUserFromToken';

describe('AdminApp', () => {
  const props = { test: 'value' };
  const token = 'test-token';
  const user = {
    id: 1,
    name: 'John',
  };

  it('renders properly when not logged in', () => {
    useUserFromToken.mockImplementation(() => ({
      loading: false,
      user: null,
      token: null,
    }));
    const renderer = new ShallowRenderer();
    const result = renderer.render(<AdminApp {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('renders properly when loading', () => {
    useUserFromToken.mockImplementation(() => ({
      loading: true,
    }));
    const renderer = new ShallowRenderer();
    const result = renderer.render(<AdminApp {...props} />);
    expect(result).toMatchSnapshot();
  });

  it('renders properly when logged in', () => {
    useUserFromToken.mockImplementation(() => ({
      user,
    }));
    const renderer = new ShallowRenderer();
    const result = renderer.render(<AdminApp {...props} />);
    expect(result).toMatchSnapshot();
  });
});

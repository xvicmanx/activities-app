import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import LoginForm from './LoginForm';

jest.mock('./useLogin');

import useLogin from './useLogin';

describe('LoginForm', () => {
  it('renders properly when not loading', () => {
    useLogin.mockImplementation(() => ({
      email: 'test-email',
      password: 'test-pass',
      onChange: () => {},
      onSubmit: () => {},
      loading: false,
      error: 'Error!',
    }));
    const renderer = new ShallowRenderer();
    const result = renderer.render(<LoginForm />);
    expect(result).toMatchSnapshot();
  });

  it('renders properly when loading', () => {
    useLogin.mockImplementation(() => ({
      email: 'test-email',
      password: 'test-pass',
      onChange: () => {},
      onSubmit: () => {},
      loading: true,
      error: null,
    }));
    const renderer = new ShallowRenderer();
    const result = renderer.render(<LoginForm />);
    expect(result).toMatchSnapshot();
  });
});

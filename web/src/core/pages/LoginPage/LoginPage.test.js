import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

jest.mock('../../forms', () => ({
  LoginForm: () => 'LoginForm',
}));

jest.mock('react-router-dom', () => ({
  Redirect: () => 'Redirect',
}));

import LoginPage from './LoginPage';


Enzyme.configure({ adapter: new Adapter() });
const mockStore = configureMockStore();

describe('LoginPage', () => {
  it('renders properly when user is not signed in', () => {
    const store = mockStore({
      Users: { data: null },
    });
    const result = Enzyme.mount(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    expect(result.find('.LoginPage').props()).toMatchSnapshot();
  });

  it('renders properly when user is signed in', () => {
    const store = mockStore({
      Users: { data: {} },
    });
    const result = Enzyme.mount(
      <Provider store={store}>
        <LoginPage />
      </Provider>
    );
    expect(result.find('Redirect').props()).toMatchSnapshot();
  });
});

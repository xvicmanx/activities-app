import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

Enzyme.configure({ adapter: new Adapter() });

import UsersDropdown from './UsersDropdown';

jest.mock('../redux/UsersActions');

import { fetchUsers, readToken } from '../redux/UsersActions';


const mockStore = configureMockStore();

describe('UsersDropdown', () => {
  const token = 'test-token';
  const users = [
    {
      id: 1,
      name: 'John',
    },
    {
      id: 2,
      name: 'Mary',
    },
  ];

  beforeEach(() => {
    readToken.mockClear().mockImplementation(() => token);
    fetchUsers.mockClear().mockImplementation(() => ({
      type: 'SET_USERS',
      payload: users,
    }));
  });

  it('renders properly', () => {
    const store = mockStore({
      Users: { users },
    });
    const onChange = jest.fn();
    const result = Enzyme.mount(
      <Provider store={store}>
        <UsersDropdown
          name="test"
          value={1}
          onChange={onChange}
        />
      </Provider>
    );

    expect(readToken).toHaveBeenCalledTimes(1);
    expect(fetchUsers).toHaveBeenCalledTimes(1);
    expect(fetchUsers).toHaveBeenCalledWith(token);
    expect(result.find('DropDown').props()).toMatchSnapshot();
  });

  it('renders properly even if the users list is not present', () => {
    const store = mockStore({
      Users: {},
    });
    const onChange = jest.fn();
    const result = Enzyme.mount(
      <Provider store={store}>
        <UsersDropdown
          name="test"
          value={1}
          onChange={onChange}
        />
      </Provider>
    );

    expect(readToken).toHaveBeenCalledTimes(1);
    expect(fetchUsers).toHaveBeenCalledTimes(1);
    expect(fetchUsers).toHaveBeenCalledWith(token);
    expect(result.find('DropDown').props()).toMatchSnapshot();
  });

  it('renders properly when loading data', () => {
    const store = mockStore({
      Users: { isLoading: true },
    });
    const onChange = jest.fn();
    const result = Enzyme.mount(
      <Provider store={store}>
        <UsersDropdown
          name="test"
          value={1}
          onChange={onChange}
        />
      </Provider>
    );

    expect(readToken).toHaveBeenCalledTimes(1);
    expect(fetchUsers).toHaveBeenCalledTimes(1);
    expect(fetchUsers).toHaveBeenCalledWith(token);
    expect(result.find('DropDown').length).toBe(0);
    expect(result.find('LoadingIndicator').length).toBe(1);
  });
});

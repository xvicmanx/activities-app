import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import CommunitiesDropdown from './CommunitiesDropdown';

jest.mock('../../users/redux/UsersActions');
jest.mock('../redux/CommunitiesActions');

import { readToken } from '../../users/redux/UsersActions';
import { fetchCommunities } from '../redux/CommunitiesActions';

Enzyme.configure({ adapter: new Adapter() });

const mockStore = configureMockStore();

describe('CommunitiesDropdown', () => {
  const token = 'test-token';
  const communities = [
    {
      id: 1,
      name: 'Test Community 1',
    },
    {
      id: 2,
      name: 'Test Community 2',
    },
  ];

  beforeEach(() => {
    readToken.mockClear().mockImplementation(() => token);
    fetchCommunities.mockClear().mockImplementation(() => ({
      type: 'SET_COMMUNITIES',
      payload: communities,
    }));
  });

  it('renders properly', () => {
    const store = mockStore({
      Communities: { communities },
    });
    const onChange = jest.fn();
    const result = Enzyme.mount(
      <Provider store={store}>
        <CommunitiesDropdown
          name="test"
          value={1}
          onChange={onChange}
        />
      </Provider>
    );

    expect(readToken).toHaveBeenCalledTimes(1);
    expect(fetchCommunities).toHaveBeenCalledTimes(1);
    expect(fetchCommunities).toHaveBeenCalledWith(token);
    expect(result.find('DropDown').props()).toMatchSnapshot();
  });

  it('renders properly even if the communities list is not present', () => {
    const store = mockStore({
      Communities: {},
    });
    const onChange = jest.fn();
    const result = Enzyme.mount(
      <Provider store={store}>
        <CommunitiesDropdown
          name="test"
          value={1}
          onChange={onChange}
        />
      </Provider>
    );

    expect(readToken).toHaveBeenCalledTimes(1);
    expect(fetchCommunities).toHaveBeenCalledTimes(1);
    expect(fetchCommunities).toHaveBeenCalledWith(token);
    expect(result.find('DropDown').props()).toMatchSnapshot();
  });

  it('renders properly when loading data', () => {
    const store = mockStore({
      Communities: { isLoading: true },
    });
    const onChange = jest.fn();
    const result = Enzyme.mount(
      <Provider store={store}>
        <CommunitiesDropdown
          name="test"
          value={1}
          onChange={onChange}
        />
      </Provider>
    );

    expect(readToken).toHaveBeenCalledTimes(1);
    expect(fetchCommunities).toHaveBeenCalledTimes(1);
    expect(fetchCommunities).toHaveBeenCalledWith(token);
    expect(result.find('DropDown').length).toBe(0);
    expect(result.find('LoadingIndicator').length).toBe(1);
  });
});

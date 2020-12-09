import React from 'react';
import useSignedInUser from './useSignedInUser';

jest.mock('react-redux');
jest.mock('./entities/users/redux/UsersActions');

import { useSelector, useDispatch } from 'react-redux';
import {
  readToken,
  loadSignedInUser,
} from './entities/users/redux/UsersActions';

describe('useSignedInUser', () => {
  it('works as expected', () => {
    const user = {
      id: 1,
      name: 'John',
    };
    const state = {
      Users: { data: null, loading: false },
    };
    const dispatch = jest.fn();

    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    useSelector.mockImplementation((f) => f(state));
    useDispatch.mockImplementation(() => dispatch);
    readToken.mockImplementation(() => 'test-token');

    const result = useSignedInUser();

    expect(result).toEqual({
      token: 'test-token',
      loading: false,
      user: null,
    });
    expect(React.useEffect).toHaveBeenCalledTimes(1);
    expect(useSelector).toHaveBeenCalledTimes(1);
    expect(useDispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(loadSignedInUser).toHaveBeenCalledTimes(1);
    expect(loadSignedInUser).toHaveBeenCalledWith({ shouldLoad: true });
  });
});

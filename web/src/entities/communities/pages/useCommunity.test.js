import useCommunity from './useCommunity';

jest.mock('react-redux');
jest.mock('../redux/CommunitiesActions');
jest.mock('../../users/redux/UsersActions');

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommunity } from '../redux/CommunitiesActions';
import { readToken } from '../../users/redux/UsersActions';

describe('useCommunity', () => {
  it('works as expected', () => {
    const community = {
      id: 1,
      name: 'Test community',
    };
    const token = 'test-token';
    const dispatch = jest.fn();

    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    useSelector.mockImplementation((f) => f({ Communities: { community } }));
    useDispatch.mockImplementation(() => dispatch);
    fetchCommunity.mockImplementation(() => community);
    readToken.mockImplementation(() => token);

    const result = useCommunity(1);

    expect(result).toEqual(community);
    expect(React.useEffect).toHaveBeenCalledTimes(1);
    expect(useSelector).toHaveBeenCalledTimes(1);
    expect(useDispatch).toHaveBeenCalledTimes(1);
    expect(readToken).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(fetchCommunity).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(community);
    expect(fetchCommunity).toHaveBeenCalledWith(token, 1);
  });
});

import React from 'react';
import useCommunity from './useCommunity';

jest.mock('react-redux');
jest.mock('../redux/CommunitiesActions');

import { useSelector, useDispatch } from 'react-redux';
import { fetchCommunity } from '../redux/CommunitiesActions';

describe('useCommunity', () => {
  it('works as expected', () => {
    const community = {
      id: 1,
      name: 'Test community',
    };
    const dispatch = jest.fn();

    jest.spyOn(React, 'useEffect').mockImplementation((f) => f());
    useSelector.mockImplementation((f) => f({ Communities: { community } }));
    useDispatch.mockImplementation(() => dispatch);
    fetchCommunity.mockImplementation(() => community);

    const result = useCommunity(1);

    expect(result).toEqual(community);
    expect(React.useEffect).toHaveBeenCalledTimes(1);
    expect(useSelector).toHaveBeenCalledTimes(1);
    expect(useDispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(fetchCommunity).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(community);
    expect(fetchCommunity).toHaveBeenCalledWith(1);
  });
});

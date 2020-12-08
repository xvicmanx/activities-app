// @flow

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommunity } from '../redux/CommunitiesActions';
import { readToken } from '../../users/redux/UsersActions';

const useCommunity = (id: number | string): ?Object => {
  const { Communities } = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = readToken();

  useEffect(() => {
    dispatch(fetchCommunity(token, id));
  }, [dispatch, token, id]);

  const { community } = Communities;

  return community;
};

export default useCommunity;

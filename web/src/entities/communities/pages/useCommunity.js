// @flow

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommunity } from '../redux/CommunitiesActions';

const useCommunity = (id: number | string): ?Object => {
  const { Communities } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommunity(id));
  }, [dispatch, id]);

  const { community } = Communities;

  return community;
};

export default useCommunity;

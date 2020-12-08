// @flow

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  readToken,
  loadUserFromToken,
} from './entities/users/redux/UsersActions';

type Result = {
  loading?: boolean,
  user?: Object,
  token?: string,
};

const useUserFromToken = (): Result => {
  const { Users } = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = readToken();

  const shouldLoadToken = !Users.data && !Users.loading && token;

  useEffect(() => {
    dispatch(
      loadUserFromToken({
        token,
        shouldLoadToken,
      })
    );
  }, [dispatch, token, shouldLoadToken]);

  return {
    token,
    loading: Users.loading,
    user: Users.data,
  };
};

export default useUserFromToken;

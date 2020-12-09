// @flow

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  readToken,
  loadSignedInUser,
} from './entities/users/redux/UsersActions';

type Result = {
  loading?: boolean,
  user?: Object,
  token?: string,
};

const useSignedInUser = (): Result => {
  const { Users } = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = readToken();

  const shouldLoad = !Users.data && !Users.loading && !!token;

  useEffect(() => {
    dispatch(loadSignedInUser({ shouldLoad }));
  }, [dispatch, shouldLoad]);

  return {
    token,
    loading: Users.loading,
    user: Users.data,
  };
};

export default useSignedInUser;

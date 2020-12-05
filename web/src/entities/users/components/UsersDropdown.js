import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUsers, readTokenFromCookie } from '../redux/UsersActions';

import { DropDown, LoadingIndicator } from '../../../core/components';

const UsersDropdown = ({ name, value, onChange }) => {
  const { Users } = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = readTokenFromCookie();

  useEffect(() => {
    dispatch(fetchUsers(token));
  }, [dispatch, token]);

  if (Users.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <DropDown
      name={name}
      items={Users.users || []}
      onChange={onChange}
      placeholder="Seleccione usuario"
      value={value}
    />
  );
};

export default UsersDropdown;

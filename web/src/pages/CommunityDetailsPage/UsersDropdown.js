import React, { useEffect } from 'react';
import { Heading } from 'react-bulma-components';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUsers } from '../../redux/Users/UsersActions';

import {
  DropDown,
  LoadingIndicator,
} from '../../components';
import { readTokenFromCookie } from '../../redux/Users/UsersActions';

const UsersDropdown = ({ name, value, onChange }) => {
  const { Users } = useSelector(state => state);
  const dispatch = useDispatch();
  const token = readTokenFromCookie();

  useEffect(() => {
    dispatch(fetchUsers(token));
  }, [dispatch]);

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

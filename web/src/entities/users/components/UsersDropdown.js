// @flow

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUsers } from '../redux/UsersActions';

import { DropDown, LoadingIndicator } from '../../../core/components';

type Props = {
  name: string,
  value?: string | number,
  onChange: Function,
};

const UsersDropdown = ({
  name,
  value,
  onChange,
}: Props): React$Element<any> => {
  const { Users } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
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

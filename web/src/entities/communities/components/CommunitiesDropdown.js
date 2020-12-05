import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCommunities } from '../redux/CommunitiesActions';

import { DropDown, LoadingIndicator } from '../../../core/components';
import { readTokenFromCookie } from '../../users/redux/UsersActions';

const CommunitiesDropdown = ({ name, value, onChange }) => {
  const { Communities } = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = readTokenFromCookie();

  useEffect(() => {
    dispatch(fetchCommunities(token));
  }, [dispatch, token]);

  if (Communities.isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <DropDown
      name={name}
      items={Communities.communities || []}
      onChange={onChange}
      placeholder="Seleccione comunidad"
      value={value}
    />
  );
};

export default CommunitiesDropdown;

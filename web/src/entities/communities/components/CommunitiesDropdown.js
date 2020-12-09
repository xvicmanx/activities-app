// @flow

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchCommunities } from '../redux/CommunitiesActions';

import { DropDown, LoadingIndicator } from '../../../core/components';

type Props = {
  name: string,
  value?: string | number,
  onChange: Function,
};

const CommunitiesDropdown = ({
  name,
  value,
  onChange,
}: Props): React$Element<any> => {
  const { Communities } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCommunities());
  }, [dispatch]);

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

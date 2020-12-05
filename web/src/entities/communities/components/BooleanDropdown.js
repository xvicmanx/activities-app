// @flow

import React from 'react';

import { DropDown } from '../../../core/components';

type Props = {
  name: string,
  value?: string | number,
  onChange: Function,
};

const BooleanDropdown = ({
  name,
  value,
  onChange,
}: Props): React$Element<any> => (
  <DropDown
    name={name}
    items={[
      {
        id: true,
        name: 'Si',
      },
      {
        id: false,
        name: 'No',
      },
    ]}
    onChange={onChange}
    placeholder="Seleccione"
    value={value}
  />
);

export default BooleanDropdown;

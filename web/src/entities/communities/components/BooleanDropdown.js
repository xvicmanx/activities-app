import React from 'react';

import { DropDown } from '../../../core/components';

const BooleanDropdown = ({ name, value, onChange }) => (
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

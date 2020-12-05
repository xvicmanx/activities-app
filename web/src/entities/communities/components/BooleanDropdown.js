import React, { useEffect } from 'react';
import { Heading } from 'react-bulma-components';
import { useSelector, useDispatch } from 'react-redux';

import { DropDown } from '../../../core/components';

const BooleanDropdown = ({ name, value, onChange }) => (
  <DropDown
    name={name}
    items={
      [
        {
          id: true,
          name: 'Si',
        },
        {
          id: false,
          name: 'No',
        },
      ]
    }
    onChange={onChange}
    placeholder="Seleccione"
    value={value}
  />
);

export default BooleanDropdown;

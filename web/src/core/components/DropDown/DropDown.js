// @flow

import React from 'react';
import { Dropdown as BulmaDropdown } from 'react-bulma-components';
import './DropDown.css';

type Item = {
  id: number | string,
  name: string,
};

type Props = {
  name: string,
  value?: any,
  onChange: Function,
  items: Array<Item>,
  placeholder?: string,
};

const DropDown = ({
  name,
  value,
  onChange,
  items,
  placeholder,
}: Props): React$Element<any> => {
  const handleChange = (val) => {
    onChange({
      persist: () => {},
      target: {
        name,
        value: val,
      },
    });
  };

  return (
    <BulmaDropdown value={value} onChange={handleChange}>
      <BulmaDropdown.Item value={0}>{placeholder}</BulmaDropdown.Item>
      {(items || []).map((el) => {
        return (
          <BulmaDropdown.Item value={el.id} key={el.id}>
            {el.name}
          </BulmaDropdown.Item>
        );
      })}
    </BulmaDropdown>
  );
};

export default DropDown;

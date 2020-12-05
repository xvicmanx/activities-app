import React from 'react';
import { Dropdown as BulmaDropdown } from 'react-bulma-components';
import './DropDown.css';

const DropDown = ({
  name,
  value,
  onChange,
  items,
  placeholder
}) => {
  const handleChange = val => {
    onChange({
      persist: () => {},
      target: {
        name,
        value: val,
      },
    });
  };

  return (
    <BulmaDropdown
      value={value}
      onChange={handleChange}
    >
      <BulmaDropdown.Item>
        {placeholder}
      </BulmaDropdown.Item>
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

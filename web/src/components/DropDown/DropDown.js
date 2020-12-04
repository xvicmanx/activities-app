import React, { useState } from 'react';
import { Dropdown as BulmaDropdown } from 'react-bulma-components';
import './DropDown.css';

const DropDown = ({
  name,
  value,
  onChange,
  items,
  placeholder
}) => {
  let options = [];

  if (items !== undefined) {
    options = items;
  }

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
      {options.map((el, i) => {
        return (
          <BulmaDropdown.Item value={i} key={el.id}>
            {el.name}
          </BulmaDropdown.Item>
        );
      })}
    </BulmaDropdown>
  );
};

export default DropDown;

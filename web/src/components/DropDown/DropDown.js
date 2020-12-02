import React, { useEffect, useState } from 'react';
import { Dropdown as BulmaDropdown } from 'react-bulma-components';
import './DropDown.css';

const DropDown = ({ onChange, data }) => {
  const [value, setValue] = useState(0);

  let options = [];

  if (data !== undefined) {
    options = data;
  }

  const handleChange = value => {
    setValue(value);
    onChange(options[+value]);
  };

  useEffect(() => {
    if (onChange !== undefined) {
      onChange(options[0]);
    }
  }, []);

  return (
    <BulmaDropdown value={value} onChange={handleChange}>
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

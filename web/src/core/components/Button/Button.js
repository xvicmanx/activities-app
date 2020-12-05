import React, { useState } from 'react';
import { Button as BulmaButton } from 'react-bulma-components';

const Button = ({ children, className, hoverClassName, ...rest }) => {
  const [hovered, setHovered] = useState(false);
  const classes = [];

  if (className) {
    classes.push(className);
  }

  if (hovered && hoverClassName) {
    classes.push(hoverClassName);
  }

  return (
    <BulmaButton
      {...rest}
      onMouseEnter={() => {
        setHovered(true);
      }}
      className={classes.join(' ')}
    >
      {children}
    </BulmaButton>
  );
};

Button.Group = BulmaButton.Group;

export default Button;

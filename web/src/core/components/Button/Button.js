// @flow

import React, { useState } from 'react';
import type { Node } from 'react';
import { Button as BulmaButton } from 'react-bulma-components';

type Props = {
  children: Node,
  className?: string,
  hoverClassName?: string,
};

const Button = ({
  children,
  className,
  hoverClassName,
  ...rest
}: Props): React$Element<any> => {
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

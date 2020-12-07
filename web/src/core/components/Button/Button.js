// @flow

import React from 'react';
import type { Node } from 'react';
import { Button as BulmaButton } from 'react-bulma-components';

type Props = {
  children: Node,
  className?: string,
};

const Button = ({
  children,
  className,
  ...rest
}: Props): React$Element<any> => (
  <BulmaButton {...rest} className={className}>
    {children}
  </BulmaButton>
);

Button.Group = BulmaButton.Group;

export default Button;

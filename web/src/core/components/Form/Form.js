// @flow

import React from 'react';
import type { Node } from 'react';
import './Form.css';

type Props = {
  children: Node,
};

const Form = ({ children, ...rest }: Props): React$Element<'form'> => (
  <form {...rest} className="Form">
    {children}
  </form>
);

export default Form;

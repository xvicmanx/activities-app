// @flow

import React from 'react';
import { Form } from 'react-bulma-components';
import './Input.css';

type Props = {
  className: string,
};

const Input = ({ className, ...rest }: Props): React$Element<any> => (
  <Form.Control className="Control">
    <Form.Input {...rest} autoComplete="off" className={`Input ${className}`} />
  </Form.Control>
);

export default Input;

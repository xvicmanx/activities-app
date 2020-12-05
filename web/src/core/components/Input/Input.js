import React from 'react';
import { Form } from 'react-bulma-components';
import './Input.css';

const Input = ({ className, ...rest }) => {
  return (
    <Form.Control className="Control">
      <Form.Input
        autoComplete="off"
        className={`Input ${className}`}
        {...rest}
      />
    </Form.Control>
  );
};

export default Input;

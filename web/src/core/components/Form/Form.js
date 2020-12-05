import React from 'react';
import './Form.css';

const Form = ({ children, ...rest }) => {
  return (
    <form {...rest} className="Form">
      {children}
    </form>
  );
};

export default Form;

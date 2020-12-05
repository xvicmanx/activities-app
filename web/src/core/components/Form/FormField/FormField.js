import React from 'react';
import './FormField.css';

const FormField = ({ label, children }) => {
  return (
    <div className="FormField">
      {label && <label className="FormField__label">{label}</label>}
      {children}
    </div>
  );
};

export default FormField;

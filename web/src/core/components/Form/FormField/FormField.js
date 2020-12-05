// @flow

import React from 'react';
import type { Node } from 'react';
import './FormField.css';

type Props = {
  label: string,
  children: Node,
};

const FormField = ({ label, children }: Props): React$Element<'div'> => (
  <div className="FormField">
    {label && <label className="FormField__label">{label}</label>}
    {children}
  </div>
);

export default FormField;

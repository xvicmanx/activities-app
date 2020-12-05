// @flow

import React from 'react';
import type { Node } from 'react';
import './Style.css';

type Props = {
  text: Node,
};

const ErrorMessage = ({ text }: Props): React$Element<'div'> => (
  <div className="ErrorMessage">{text}</div>
);

export default ErrorMessage;

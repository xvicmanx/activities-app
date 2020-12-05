// @flow

import React from 'react';
import type { Node } from 'react';
import './Message.css';

type Props = {
  children: Node,
};

const Message = ({ children }: Props): React$Element<'div'> => (
  <div className="Message">{children}</div>
);

export default Message;

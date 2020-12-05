import React from 'react';
import { Tag } from 'react-bulma-components';

const Label = (props) => {
  return <Tag {...props} />;
};

Label.Group = Tag.Group;

export default Label;

// @flow

import React from 'react';
import { Link } from 'react-router-dom';

export const nameTableValueResolver = (item: Object): React$Element<any> => (
  <Link to={`/communities/${item.id}`}>{item.name}</Link>
);

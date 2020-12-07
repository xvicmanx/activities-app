// @flow

import React from 'react';

import UsersDropdown from '../../../users/components/UsersDropdown';
import BooleanDropdown from '../BooleanDropdown';

type RendererProps = {
  field: Object,
};

export const MembersSelectRenderer = ({ field }: RendererProps): React$Element<any> => (
  <UsersDropdown {...field} />
);

export const CoordinatesSelectRenderer = ({ field }: RendererProps): React$Element<any> => (
  <BooleanDropdown {...field} />
);

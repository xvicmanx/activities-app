// @flow

import React from 'react';

import CommunitiesDropdown from '../../../communities/components/CommunitiesDropdown';


type RendererProps = {
  field: {
    value: string | number,
    name: string,
    onChange: Function,
  },
};

export const DescriptionRenderer = ({ field }: RendererProps): React$Element<any> => (
  <textarea {...field} />
);

export const CommunitiesSelectRenderer = ({ field }: RendererProps): React$Element<any> => (
  <CommunitiesDropdown
    name={field.name}
    value={field.value}
    onChange={field.onChange}
  />
);

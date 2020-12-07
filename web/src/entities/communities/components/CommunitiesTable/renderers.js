// @flow

import React from 'react';

type RendererProps = {
  field: Object,
};

export const DescriptionRenderer = ({
  field,
}: RendererProps): React$Element<any> => <textarea {...field} />;

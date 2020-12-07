import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

import CommunitiesPage from './CommunitiesPage';

describe('CommunitiesPage', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<CommunitiesPage />);
    expect(result).toMatchSnapshot();
  });
});

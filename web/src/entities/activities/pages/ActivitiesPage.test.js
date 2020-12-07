import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

import ActivitiesPage from './ActivitiesPage';

describe('ActivitiesPage', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<ActivitiesPage />);
    expect(result).toMatchSnapshot();
  });
});

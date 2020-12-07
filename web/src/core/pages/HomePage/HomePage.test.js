import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<HomePage />);
    expect(result).toMatchSnapshot();
  });
});

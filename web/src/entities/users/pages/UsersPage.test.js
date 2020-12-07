import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

import UsersPage from './UsersPage';

describe('UsersPage', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(<UsersPage />);
    expect(result).toMatchSnapshot();
  });
});

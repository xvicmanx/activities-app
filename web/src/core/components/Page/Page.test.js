import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

import Page from './Page';

describe('Page', () => {
  it('renders properly', () => {
    const renderer = new ShallowRenderer();
    const result = renderer.render(
      <Page title="Test title" icon={faBuilding}>
        Hello!
      </Page>
    );
    expect(result).toMatchSnapshot();
  });
});

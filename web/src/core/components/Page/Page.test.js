import React from 'react';
import renderer from 'react-test-renderer';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

import Page from './Page';

describe('Page', () => {
  it('renders properly', () => {
    const component = renderer.create(
      <Page title="Test title" icon={faBuilding}>
        Hello!
      </Page>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

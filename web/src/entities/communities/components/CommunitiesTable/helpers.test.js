import ShallowRenderer from 'react-test-renderer/shallow';

import { nameTableValueResolver } from './helpers';

describe('CommunitiesTable helpers', () => {
  describe('nameTableValueResolver', () => {
    it('returns the expected values', () => {
      expect(nameTableValueResolver({ id: 1, name: 'John' })).toMatchSnapshot();
    });
  });
});

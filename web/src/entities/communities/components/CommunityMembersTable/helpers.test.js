import { coordinatesTableValueResolver } from './helpers';

describe('CommunityMembersTable helpers', () => {
  describe('coordinatesTableValueResolver', () => {
    it('returns the expected values', () => {
      expect(coordinatesTableValueResolver({ coordinates: true })).toBe('Si');
      expect(coordinatesTableValueResolver({ coordinates: false })).toBe('No');
    });
  });
});

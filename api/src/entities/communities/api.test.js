// Community API tests

import { expect } from 'chai';
import { before, describe, it } from 'mocha';

import { getAuthHeaders, getUrl } from '../../test/helpers';
import requester from '../../test/requester';
import createTestUser from '../users/test-entity-factory';
import createTestCommunity from './test-entity-factory';


const mapItem = (x) => ({
  id: x.id,
  title: x.title,
  description: x.description,
});

describe('Community API', () => {
  describe('Getting user communities', () => {
    const getUserCommunities = async (user) => {
      let headers = {};

      if (user) {
        headers = await getAuthHeaders(user);
      }

      return requester.get(getUrl('/communities/list-for-user'), headers);
    };

    let communities;
    let user;

    before(async () => {
      communities = [
        await createTestCommunity(),
        await createTestCommunity(),
        await createTestCommunity(),
      ];
      user = await createTestUser();

      await Promise.all(communities.map((activity) => user.addCommunity(activity)));
    });

    it('fails if the user is not logged in', async () => {
      const response = await getUserCommunities(null);
      expect(response.success).to.be.equal(undefined);
      expect(response.user).to.be.equal(undefined);
      expect(response.message).to.be.equal('It is not authorized');
    });

    it('successfully returns the pending communities', async () => {
      const response = await getUserCommunities(user);
      expect(response.success).to.be.equal(true);
      expect(response.message).to.be.equal(undefined);
      expect(response.communities.map(mapItem)).to.eql(communities.map(mapItem));
    });
  });
});

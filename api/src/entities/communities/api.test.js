// Community API tests

import { expect } from 'chai';
import { before, describe, it } from 'mocha';

import { getAuthHeaders, getUrl } from '../../test/helpers';
import requester from '../../test/requester';
import createTestUser from '../users/test-entity-factory';
import createTestCommunity from './test-entity-factory';


const mapItem = (x, shouldMapMembers = false) => {
  let members = [];

  if (shouldMapMembers) {
    members = x.members.map((u) => ({
      id: u.id,
      name: u.name,
      profileURL: u.profileURL,
    }));
  }

  return {
    id: x.id,
    name: x.name,
    slogan: x.slogan,
    members,
  };
};

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

      await Promise.all(communities.map((community) => user.addCommunity(community)));
      await Promise.all(communities.map((community) => community.reload({ include: { all: true } })));
    });

    it('fails if the user is not logged in', async () => {
      const response = await getUserCommunities(null);
      expect(response.success).to.be.equal(undefined);
      expect(response.user).to.be.equal(undefined);
      expect(response.message).to.be.equal('It is not authorized');
    });

    it('successfully returns the user communities', async () => {
      const response = await getUserCommunities(user);
      expect(response.success).to.be.equal(true);
      expect(response.message).to.be.equal(undefined);
      expect(response.communities.map((c) => mapItem(c))).to.eql(communities.map((c) => mapItem(c)));
    });
  });

  describe('Finds a community by id', () => {
    const findById = async (id, logInUser = null) => {
      let headers = {};

      if (logInUser) {
        headers = await getAuthHeaders(logInUser);
      }

      return requester.get(getUrl(`/communities/find/${id}`), headers);
    };

    let userInCommunity;
    let userNotInCommunity;
    let community;

    before(async () => {
      userInCommunity = await createTestUser();
      userNotInCommunity = await createTestUser();
      community = await createTestCommunity();

      await community.addMember(userInCommunity);

      await community.reload({ include: { all: true } });
    });

    it('fails if the user is not logged in', async () => {
      const response = await findById(community.id);
      expect(response.success).to.be.equal(undefined);
      expect(response.user).to.be.equal(undefined);
      expect(response.message).to.be.equal('It is not authorized');
    });

    it('fails if the user does not belong to the community', async () => {
      const response = await findById(community.id, userNotInCommunity);
      expect(response.success).to.be.equal(false);
      expect(response.community).to.be.equal(undefined);
      expect(response.message).to.be.equal('The user does not belong to the community');
    });

    it('returns item successfully if the user is logged in and belongs to the community', async () => {
      const response = await findById(community.id, userInCommunity);
      expect(response.success).to.be.equal(true);
      expect(mapItem(response.community, true)).to.eql(mapItem(community, true));
    });
  });
});

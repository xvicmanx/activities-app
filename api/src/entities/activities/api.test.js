// Activity API tests

import { expect } from 'chai';
import { before, describe, it } from 'mocha';

import { getAuthHeaders, getUrl } from '../../test/helpers';
import requester from '../../test/requester';
import createTestUser from '../users/test-entity-factory';
import createTestActivity from './test-entity-factory';


const mapItem = (x) => ({
  title: x.title,
  description: x.description,
  date: x.date.toISOString ? x.date.toISOString() : x.date.toString(),
});

describe('Activity API', () => {
  describe('Getting pending activies', () => {
    const getPendingActivities = async (user) => {
      let headers = {};

      if (user) {
        headers = await getAuthHeaders(user);
      }

      return requester.get(getUrl('/activities/pending'), headers);
    };

    let activities;
    let user;

    before(async () => {
      activities = [
        await createTestActivity(),
        await createTestActivity(),
        await createTestActivity(),
      ];
      user = await createTestUser();

      await Promise.all(activities.map((activity) => user.addActivity(activity)));
    });

    it('fails if the user is not logged in', async () => {
      const response = await getPendingActivities(null);
      expect(response.success).to.be.equal(undefined);
      expect(response.user).to.be.equal(undefined);
      expect(response.message).to.be.equal('It is not authorized');
    });

    it('successfully returns the pending activities', async () => {
      const response = await getPendingActivities(user);
      expect(response.success).to.be.equal(true);
      expect(response.message).to.be.equal(undefined);
      expect(response.activities.map(mapItem)).to.eql(activities.map(mapItem));
    });
  });
});

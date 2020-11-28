// Activity API tests

import { expect } from 'chai';
import { before, describe, it } from 'mocha';

import { getAuthHeaders, getUrl } from '../../test/helpers';
import requester from '../../test/requester';
import createTestUser from '../users/test-entity-factory';
import createTestActivity from './test-entity-factory';


const mapPendingActivityItem = (x) => ({
  title: x.title,
  description: x.description,
  date: x.date.toISOString ? x.date.toISOString() : x.date.toString(),
  userWillAttend: x.userWillAttend,
  willAttendCount: x.willAttendCount,
});

const mapParticipantItem = (x) => ({
  id: x.id,
  name: x.name,
  profileURL: x.profileURL,
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

      await Promise.all(activities.map((activity) => user.addActivity(activity, { through: { willAttend: true } })));
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
      expect(response.activities.map(mapPendingActivityItem))
        .to.eql(activities.map(mapPendingActivityItem)
          .map((x) => ({ ...x, userWillAttend: true, willAttendCount: 1 })));
    });
  });

  describe('Getting activity participants list', () => {
    const getActivityParticipantsList = async (id, user) => {
      let headers = {};

      if (user) {
        headers = await getAuthHeaders(user);
      }

      return requester.get(getUrl(`/activities/${id}/participants-list`), headers);
    };

    let users;
    let activity;
    let willAttend;
    let loggedInUser;

    before(async () => {
      loggedInUser = await createTestUser();
      users = [
        await createTestUser(),
        await createTestUser(),
        await createTestUser(),
      ];

      willAttend = [
        true,
        true,
        false,
      ];

      activity = await createTestActivity();

      await Promise.all(users.map((user, i) => user.addActivity(activity, { through: { willAttend: willAttend[i] } })));
    });

    it('fails if the user is not logged in', async () => {
      const response = await getActivityParticipantsList(activity.id, null);
      expect(response.success).to.be.equal(undefined);
      expect(response.user).to.be.equal(undefined);
      expect(response.message).to.be.equal('It is not authorized');
    });

    it('successfully returns the participants list', async () => {
      const response = await getActivityParticipantsList(activity.id, loggedInUser);
      expect(response.success).to.be.equal(true);
      expect(response.message).to.be.equal(undefined);
      expect(response.participants.map(mapParticipantItem))
        .to.eql(users.slice(0, 2).map(mapParticipantItem));
    });
  });
});

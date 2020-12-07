import React from 'react';
import { encode } from '../../../core/helpers';
import ActivitiesService from './ActivitiesService';

jest.mock('../../../core/requester');

import requester from '../../../core/requester';

describe('ActivitiesService', () => {
  beforeEach(() => {
    requester.mockClear();
    requester.mockImplementation(() => Promise.resolve({ success: true }));
  });

  describe('fetchActivities', () => {
    it('works as expected', async () => {
      const queryOptions = encode({ name: 'test' });
      const result = await ActivitiesService.fetchActivities(
        'test-token',
        queryOptions
      );

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/activities/list?options=eyJuYW1lIjoidGVzdCJ9',
        token: 'test-token',
      });
    });

    it('works as expected when options are not passed', async () => {
      const result = await ActivitiesService.fetchActivities('test-token');

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/activities/list?options=',
        token: 'test-token',
      });
    });
  });

  describe('createActivity', () => {
    it('works as expected', async () => {
      const payload = { title: 'test' };
      const result = await ActivitiesService.createActivity(
        payload,
        'test-token'
      );

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/activities/create',
        method: 'POST',
        payload,
        token: 'test-token',
      });
    });
  });

  describe('updateActivity', () => {
    it('works as expected', async () => {
      const payload = { id: 1, title: 'test' };
      const result = await ActivitiesService.updateActivity(
        payload,
        'test-token'
      );

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/activities/1/update',
        method: 'PUT',
        payload,
        token: 'test-token',
      });
    });
  });

  describe('deleteActivity', () => {
    it('works as expected', async () => {
      const result = await ActivitiesService.deleteActivity(1, 'test-token');

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/activities/1/delete',
        method: 'DELETE',
        token: 'test-token',
      });
    });
  });
});

import React from 'react';

import Controller from './controller';

jest.mock('../../services/ActivitiesService');

import ActivitiesService from '../../services/ActivitiesService';

describe('ActivitiesTable controller', () => {
  const activities = [
    {
      id: 1,
      title: 'Test activity 1',
      description: 'test 1',
    },
    {
      id: 2,
      title: 'Test activity 2',
      description: 'test 2',
    },
  ];

  beforeEach(() => {
    ActivitiesService.fetchActivities.mockClear();
    ActivitiesService.fetchActivities.mockImplementation(() =>
      Promise.resolve({ activities, total: activities.length })
    );

    ActivitiesService.createActivity.mockClear();
    ActivitiesService.createActivity.mockImplementation(() =>
      Promise.resolve({ success: true })
    );

    ActivitiesService.updateActivity.mockClear();
    ActivitiesService.updateActivity.mockImplementation(() =>
      Promise.resolve({ success: true })
    );

    ActivitiesService.deleteActivity.mockClear();
    ActivitiesService.deleteActivity.mockImplementation(() =>
      Promise.resolve({ success: true })
    );
  });

  describe('fetchItems', () => {
    it('works as expected', async () => {
      const options = {
        activePage: 1,
        itemsPerPage: 10,
        queryRules: [],
      };

      const result = await Controller.fetchItems(options);

      expect(result).toEqual({
        items: activities,
        total: activities.length,
      });
      expect(ActivitiesService.fetchActivities).toHaveBeenCalledTimes(1);
      expect(ActivitiesService.fetchActivities)
        .toHaveBeenCalledWith('eyJhY3RpdmVQYWdlIjoxLCJpdGVtc1BlclBhZ2UiOjEwLCJxdWVyeVJ1bGVzIjpbXX0=');
    });
  });

  describe('create', () => {
    it('works as expected', async () => {
      const activity = {
        id: 1,
        title: 'Test activity',
      };

      const result = await Controller.create(activity);

      expect(result).toEqual({ success: true });
      expect(ActivitiesService.createActivity).toHaveBeenCalledTimes(1);
      expect(ActivitiesService.createActivity).toHaveBeenCalledWith(activity);
    });

    it('handles as expected unexpected errors', async () => {
      const activity = {
        id: 1,
        title: 'Test activity',
      };

      ActivitiesService.createActivity.mockImplementation(() =>
        Promise.reject(new Error('Unexpected error'))
      );
      const result = await Controller.create(activity);

      expect(result).toEqual({ success: false, message: 'Unexpected error' });
      expect(ActivitiesService.createActivity).toHaveBeenCalledTimes(1);
      expect(ActivitiesService.createActivity).toHaveBeenCalledWith(activity);
    });
  });

  describe('update', () => {
    it('works as expected', async () => {
      const activity = {
        id: 1,
        title: 'Test activity',
      };

      const result = await Controller.update(activity);

      expect(result).toEqual({ success: true });
      expect(ActivitiesService.updateActivity).toHaveBeenCalledTimes(1);
      expect(ActivitiesService.updateActivity).toHaveBeenCalledWith(activity);
    });

    it('handles as expected unexpected errors', async () => {
      const activity = {
        id: 1,
        title: 'Test activity',
      };

      ActivitiesService.updateActivity.mockImplementation(() =>
        Promise.reject(new Error('Unexpected error'))
      );
      const result = await Controller.update(activity);

      expect(result).toEqual({ success: false, message: 'Unexpected error' });
      expect(ActivitiesService.updateActivity).toHaveBeenCalledTimes(1);
      expect(ActivitiesService.updateActivity).toHaveBeenCalledWith(activity);
    });
  });

  describe('delete', () => {
    it('works as expected', async () => {
      const activity = {
        id: 1,
        title: 'Test activity',
      };

      const result = await Controller.delete(activity);

      expect(result).toEqual({ success: true });
      expect(ActivitiesService.deleteActivity).toHaveBeenCalledTimes(1);
      expect(ActivitiesService.deleteActivity).toHaveBeenCalledWith(activity.id);
    });

    it('handles as expected unexpected errors', async () => {
      const activity = {
        id: 1,
        title: 'Test activity',
      };

      ActivitiesService.deleteActivity.mockImplementation(() =>
        Promise.reject(new Error('Unexpected error'))
      );
      const result = await Controller.delete(activity);

      expect(result).toEqual({ success: false, message: 'Unexpected error' });
      expect(ActivitiesService.deleteActivity).toHaveBeenCalledTimes(1);
      expect(ActivitiesService.deleteActivity).toHaveBeenCalledWith(activity.id);
    });
  });
});

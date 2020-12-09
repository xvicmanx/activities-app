import React from 'react';

import Controller from './controller';

jest.mock('react-toastify');
jest.mock('../../services/CommunitiesService');

import { toast } from 'react-toastify';
import CommunitiesService from '../../services/CommunitiesService';

describe('CommunitiesTable controller', () => {
  const communities = [
    {
      id: 1,
      name: 'Test community 1',
      slogan: 'test slogan 1',
    },
    {
      id: 2,
      name: 'Test community 2',
      slogan: 'test slogan 2',
    },
  ];

  beforeEach(() => {
    toast.success.mockClear();

    CommunitiesService.fetchCommunities.mockClear();
    CommunitiesService.fetchCommunities.mockImplementation(() =>
      Promise.resolve({ communities, total: communities.length })
    );

    CommunitiesService.createCommunity.mockClear();
    CommunitiesService.createCommunity.mockImplementation(() =>
      Promise.resolve({ success: true })
    );

    CommunitiesService.updateCommunity.mockClear();
    CommunitiesService.updateCommunity.mockImplementation(() =>
      Promise.resolve({ success: true })
    );

    CommunitiesService.deleteCommunity.mockClear();
    CommunitiesService.deleteCommunity.mockImplementation(() =>
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
        items: communities,
        total: communities.length,
      });
      expect(CommunitiesService.fetchCommunities).toHaveBeenCalledTimes(1);
      expect(CommunitiesService.fetchCommunities).toHaveBeenCalledWith(
        'eyJhY3RpdmVQYWdlIjoxLCJpdGVtc1BlclBhZ2UiOjEwLCJxdWVyeVJ1bGVzIjpbXX0='
      );
    });
  });

  describe('create', () => {
    it('works as expected', async () => {
      const community = {
        id: 1,
        name: 'Test community',
      };

      const result = await Controller.create(community);

      expect(result).toEqual({ success: true });
      expect(CommunitiesService.createCommunity).toHaveBeenCalledTimes(1);
      expect(CommunitiesService.createCommunity).toHaveBeenCalledWith(
        community
      );

      expect(toast.success).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(
        'Comunidad creada de manera exitosa!'
      );
    });

    it('handles as expected unexpected errors', async () => {
      const community = {
        id: 1,
        name: 'Test community',
      };

      CommunitiesService.createCommunity.mockImplementation(() =>
        Promise.reject(new Error('Unexpected error'))
      );
      const result = await Controller.create(community);

      expect(result).toEqual({ success: false, message: 'Unexpected error' });
      expect(CommunitiesService.createCommunity).toHaveBeenCalledTimes(1);
      expect(CommunitiesService.createCommunity).toHaveBeenCalledWith(
        community
      );
      expect(toast.success).toHaveBeenCalledTimes(0);
    });
  });

  describe('update', () => {
    it('works as expected', async () => {
      const community = {
        id: 1,
        name: 'Test community',
      };

      const result = await Controller.update(community);

      expect(result).toEqual({ success: true });
      expect(CommunitiesService.updateCommunity).toHaveBeenCalledTimes(1);
      expect(CommunitiesService.updateCommunity).toHaveBeenCalledWith(
        community
      );

      expect(toast.success).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(
        'Comunidad actualizada de manera exitosa!'
      );
    });

    it('handles as expected unexpected errors', async () => {
      const community = {
        id: 1,
        name: 'Test community',
      };

      CommunitiesService.updateCommunity.mockImplementation(() =>
        Promise.reject(new Error('Unexpected error'))
      );
      const result = await Controller.update(community);

      expect(result).toEqual({ success: false, message: 'Unexpected error' });
      expect(CommunitiesService.updateCommunity).toHaveBeenCalledTimes(1);
      expect(CommunitiesService.updateCommunity).toHaveBeenCalledWith(
        community
      );
      expect(toast.success).toHaveBeenCalledTimes(0);
    });
  });

  describe('delete', () => {
    it('works as expected', async () => {
      const community = {
        id: 1,
        name: 'Test community',
      };

      const result = await Controller.delete(community);

      expect(result).toEqual({ success: true });
      expect(CommunitiesService.deleteCommunity).toHaveBeenCalledTimes(1);
      expect(CommunitiesService.deleteCommunity).toHaveBeenCalledWith(
        community.id
      );

      expect(toast.success).toHaveBeenCalledTimes(1);
      expect(toast.success).toHaveBeenCalledWith(
        'Comunidad eliminada de manera exitosa!'
      );
    });

    it('handles as expected unexpected errors', async () => {
      const community = {
        id: 1,
        name: 'Test community',
      };

      CommunitiesService.deleteCommunity.mockImplementation(() =>
        Promise.reject(new Error('Unexpected error'))
      );
      const result = await Controller.delete(community);

      expect(result).toEqual({ success: false, message: 'Unexpected error' });
      expect(CommunitiesService.deleteCommunity).toHaveBeenCalledTimes(1);
      expect(CommunitiesService.deleteCommunity).toHaveBeenCalledWith(
        community.id
      );
      expect(toast.success).toHaveBeenCalledTimes(0);
    });
  });
});

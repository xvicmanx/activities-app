import React from 'react';
import { encode } from '../../../core/helpers';
import CommunitiesService from './CommunitiesService';

jest.mock('../../../core/requester');

import requester from '../../../core/requester';

describe('CommunitiesService', () => {
  beforeEach(() => {
    requester.mockClear();
    requester.mockImplementation(() => Promise.resolve({ success: true }));
  });

  describe('fetchCommunities', () => {
    it('works as expected', async () => {
      const queryOptions = encode({ name: 'test' });
      const result = await CommunitiesService.fetchCommunities(
        'test-token',
        queryOptions,
      );

      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/communities/list?options=eyJuYW1lIjoidGVzdCJ9',
        token: 'test-token',
      });
    });

    it('works as expected when options are not passed', async () => {
      const result = await CommunitiesService.fetchCommunities('test-token');
      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/communities/list?options=',
        token: 'test-token',
      });
    });
  });

  describe('fetchCommunity', () => {
    it('works as expected', async () => {
      const result = await CommunitiesService.fetchCommunity(
        'test-token',
        1,
      );
  
      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/communities/find/1',
        token: 'test-token',
      });
    });
  });

  describe('createCommunity', () => {
    it('works as expected', async () => {
      const payload = { title: 'test' };
      const result = await CommunitiesService.createCommunity(
        payload,
        'test-token',
      );
  
      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/communities/create',
        method: 'POST',
        payload,
        token: 'test-token',
      });
    });
  });

  describe('updateCommunity', () => {
    it('works as expected', async () => {
      const payload = { id: 1, title: 'test' };
      const result = await CommunitiesService.updateCommunity(
        payload,
        'test-token',
      );
  
      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/communities/1/update',
        method: 'PUT',
        payload,
        token: 'test-token',
      });
    });
  });

  describe('deleteCommunity', () => {
    it('works as expected', async () => {
      const result = await CommunitiesService.deleteCommunity(
        1,
        'test-token',
      );
  
      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/communities/1/delete',
        method: 'DELETE',
        token: 'test-token',
      });
    });
  });

  describe('addMember', () => {
    it('works as expected', async () => {
      const result = await CommunitiesService.addMember(
        'test-token',
        1,
        2,
        true,
      );
  
      expect(result).toEqual({ success: true });
      expect(requester).toHaveBeenCalledTimes(1);
      expect(requester).toHaveBeenCalledWith({
        path: '/communities/1/add-member/2?coordinates=1',
        method: 'POST',
        token: 'test-token',
      });
    });
  });
});

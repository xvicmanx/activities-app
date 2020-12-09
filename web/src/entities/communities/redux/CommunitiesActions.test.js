import React from 'react';

import {
  fetchCommunities,
  fetchCommunity,
  addMember,
} from './CommunitiesActions';

jest.mock('../services/CommunitiesService');

import CommunitiesService from '../services/CommunitiesService';

describe('CommunitiesActions', () => {
  const member = {
    id: 1,
    name: 'John',
  };

  const community = {
    id: 1,
    name: 'Test community',
  };
  const communities = [community];

  beforeEach(() => {
    CommunitiesService.fetchCommunities
      .mockImplementation(() => Promise.resolve({ communities, success: true }))
      .mockClear();

    CommunitiesService.fetchCommunity
      .mockImplementation(() => Promise.resolve({ community, success: true }))
      .mockClear();

    CommunitiesService.addMember
      .mockImplementation(() => Promise.resolve({ member, success: true }))
      .mockClear();
  });

  describe('fetchCommunities', () => {
    describe('When success', () => {
      it('works as expected', async () => {
        const dispatch = jest.fn();

        await fetchCommunities()(dispatch);

        expect(CommunitiesService.fetchCommunities).toHaveBeenCalledTimes(1);

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITIES_LOADING_STATE',
          payload: true,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITIES',
          payload: communities,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITIES_LOADING_STATE',
          payload: false,
        });
      });
    });

    describe('When not success', () => {
      it('works as expected', async () => {
        const dispatch = jest.fn();
        CommunitiesService.fetchCommunities.mockImplementation(() =>
          Promise.resolve({ message: 'Error!', success: false })
        );

        await fetchCommunities()(dispatch);

        expect(CommunitiesService.fetchCommunities).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledTimes(3);
        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITIES_LOADING_STATE',
          payload: true,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITIES_ERROR',
          payload: 'Error!',
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITIES_LOADING_STATE',
          payload: false,
        });
      });
    });
  });

  describe('fetchCommunity', () => {
    describe('When success', () => {
      it('works as expected', async () => {
        const dispatch = jest.fn();

        await fetchCommunity(community.id)(dispatch);

        expect(CommunitiesService.fetchCommunity).toHaveBeenCalledTimes(1);
        expect(CommunitiesService.fetchCommunity).toHaveBeenCalledWith(community.id);

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITY_LOADING_STATE',
          payload: true,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITY',
          payload: community,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITY_LOADING_STATE',
          payload: false,
        });
      });
    });

    describe('When not success', () => {
      it('works as expected', async () => {
        const dispatch = jest.fn();
        CommunitiesService.fetchCommunity.mockImplementation(() =>
          Promise.resolve({ message: 'Error!', success: false })
        );

        await fetchCommunity(community.id)(dispatch);

        expect(CommunitiesService.fetchCommunity).toHaveBeenCalledTimes(1);
        expect(CommunitiesService.fetchCommunity).toHaveBeenCalledWith(community.id);

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITY_LOADING_STATE',
          payload: true,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITY_ERROR',
          payload: 'Error!',
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITY_LOADING_STATE',
          payload: false,
        });
      });
    });
  });

  describe('addMember', () => {
    describe('When success', () => {
      it('works as expected', async () => {
        const dispatch = jest.fn();

        await addMember(community.id, member.id, true)(dispatch);

        expect(CommunitiesService.addMember).toHaveBeenCalledTimes(1);
        expect(CommunitiesService.addMember).toHaveBeenCalledWith(community.id, member.id, true);

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITY_LOADING_STATE',
          payload: true,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'ADD_MEMBER',
          payload: member,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITY_LOADING_STATE',
          payload: false,
        });
      });
    });

    describe('When not success', () => {
      it('works as expected', async () => {
        const dispatch = jest.fn();
        CommunitiesService.addMember.mockImplementation(() =>
          Promise.resolve({ message: 'Error!', success: false })
        );

        await addMember(community.id, member.id, true)(dispatch);

        expect(CommunitiesService.addMember).toHaveBeenCalledTimes(1);
        expect(CommunitiesService.addMember).toHaveBeenCalledWith(community.id, member.id, true);

        expect(dispatch).toHaveBeenCalledTimes(3);

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITY_LOADING_STATE',
          payload: true,
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITY_ERROR',
          payload: 'Error!',
        });

        expect(dispatch).toHaveBeenCalledWith({
          type: 'SET_COMMUNITY_LOADING_STATE',
          payload: false,
        });
      });
    });
  });
});

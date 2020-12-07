import { createAsyncThunk } from '@reduxjs/toolkit';
import CommunitiesService from './communities.service';
import { normalize, schema } from 'normalizr';

const comunityEntity = new schema.Entity('communities');
const memberEntity = new schema.Entity('members');

export const fetchCommunities = createAsyncThunk(
  'communities/fetchCommunities',
  async (arg, thunkAPI) => {
    const token = thunkAPI.getState().auth.currentUser.token;
    const res = await CommunitiesService.fetchCommunities(token);

    if (res.success) {
      const normalized = normalize(res.communities, [comunityEntity]);
      const { communities } = normalized.entities;
      return { ids: normalized.result, communities };
    }
  }
);

export const fetchCommunityById = createAsyncThunk(
  'communities/fetchCommunityById',
  async (comunityId, thunkAPI) => {
    const token = thunkAPI.getState().auth.currentUser.token;
    const res = await CommunitiesService.fetchCommunityById(comunityId, token);

    if (res.success) {
      const normalized = normalize(res.community, {
        members: [memberEntity],
      });

      const { members } = normalized.entities;

      const coordinators = { ids: [], entities: {} };

      Object.keys(members).forEach((key) => {
        if (members[key].coordinates) {
          coordinators.ids.push(key);
          coordinators.entities[key] = members[key];
        }
      });

      return {
        comunity: normalized.result,
        members: normalized.entities.members,
        coordinators,
      };
    }
  }
);

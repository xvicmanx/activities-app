import { createSlice } from '@reduxjs/toolkit';
import { fetchCommunities, fetchCommunityById } from './actions';

const communitiesSlice = createSlice({
  name: 'communities',
  initialState: {
    isLoading: true,
    communities: {
      ids: [],
      entities: {},
    },
    members: {
      ids: [],
      entities: {},
    },
    coordinators: {
      ids: [],
      entities: {},
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommunities.fulfilled, (state, { payload }) => {
        const { ids, communities } = payload;
        state.communities.entities = communities;
        state.communities.ids = ids;
        state.isLoading = false;
      })
      .addCase(fetchCommunityById.fulfilled, (state, { payload }) => {
        const { comunity, members, coordinators } = payload;
        state.members.entities = members;
        state.members.ids = comunity.members;
        state.communities.entities[comunity.id].members = comunity.members;
        state.coordinators.entities = coordinators.entities;
        state.coordinators.ids = coordinators.ids;
      });
  },
});

export default communitiesSlice;

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
      .addCase(fetchCommunities.fulfilled, (state, action) => {
        const { ids, communities } = action.payload;
        state.communities.entities = communities;
        state.communities.ids = ids;
        state.isLoading = false;
      })
      .addCase(fetchCommunities.rejected, (state, action) => {
        console.log('fetchCommunities.rejected', action);
      })
      .addCase(fetchCommunityById.fulfilled, (state, action) => {
        const { comunity, members, coordinators } = action.payload;
        state.members.entities = members;
        state.members.ids = comunity.members;
        state.coordinators.entities = coordinators.entities;
        state.coordinators.ids = coordinators.ids;
      })
      .addCase(fetchCommunityById.rejected, (state, action) => {
        console.log('fetchCommunityById.rejected', action);
      });
  },
});

export default communitiesSlice;

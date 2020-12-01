import { createSlice } from '@reduxjs/toolkit';
import authSlice from '../auth/authSlice';

const INITIAL_STATE = {
  communities: {
    isLoading: true,
    list: [],
  },
  community: {
    isLoading: true,
    data: null,
  },
};

const communitiesSlice = createSlice({
  name: 'communities',
  initialState: INITIAL_STATE,
  reducers: {
    setCommunities: (state, { payload }) => {
      state.communities.list = payload;
      state.communities.isLoading = false;
    },
    setCommunity: (state, { payload }) => {
      state.community.data = payload;
      state.community.isLoading = false;
    },
  },
  extraReducers: {
    [authSlice.actions.logOut]: (state, { payload }) => {
      return { ...INITIAL_STATE };
    },
  },
});

export default communitiesSlice;

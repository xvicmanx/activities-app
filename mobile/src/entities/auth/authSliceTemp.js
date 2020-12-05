import { createSlice } from '@reduxjs/toolkit';
import { checkUserInfo, loginUser } from './actions';

export default createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    currentUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentUser = payload;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;
      });
  },
});

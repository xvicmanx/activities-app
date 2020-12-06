import { createSlice, current } from '@reduxjs/toolkit';
import { checkUserInfo, loginUser } from './actions';
import { updateImage, updateDescription } from '../user/actions';

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
      })
      .addCase(updateImage.fulfilled, (state, { payload }) => {
        state.currentUser.profileURL = payload;
      })
      .addCase(updateDescription.fulfilled, (state, { payload }) => {
        state.currentUser.description = payload;
      });
  },
});

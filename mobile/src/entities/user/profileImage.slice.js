import { createSlice } from '@reduxjs/toolkit';
import { loginUser, checkUserInfo } from '../auth/actions';
import { updateImage } from './actions';

export default createSlice({
  name: 'image',
  initialState: {
    isLoading: true,
    url: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.url = payload.profileURL;
        state.isLoading = false;
      })
      .addCase(checkUserInfo.fulfilled, (state, { payload }) => {
        state.url = payload.profileURL;
        state.isLoading = false;
      })
      .addCase(updateImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateImage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.url = payload;
      });
  },
});

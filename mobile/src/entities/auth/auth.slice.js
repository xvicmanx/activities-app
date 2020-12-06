import { createSlice } from '@reduxjs/toolkit';
import { checkUserInfo, loginUser } from './actions';
import { updateImage, updateDescription, logOut } from '../user/actions';
import ERRORS from '../../constants/errors';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    currentUser: null,
    network: {
      error: null,
      message: '',
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentUser = payload;

        state.network.error = false;
        state.network.message = '';
      })
      .addCase(checkUserInfo.rejected, (state, { payload }) => {
        if (payload.net) {
          state.network.error = true;
          state.network.message = ERRORS.network;
        }
        
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.currentUser = payload;

        state.network.error = false;
        state.network.message = '';
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        if (payload?.net) {
          state.network.error = true;
          state.network.message = ERRORS.network;
          state.isLoading = false;
        }
      })
      .addCase(updateImage.fulfilled, (state, { payload }) => {
        state.currentUser.profileURL = payload;
      })
      .addCase(updateDescription.fulfilled, (state, { payload }) => {
        state.currentUser.description = payload;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.currentUser = null;
      });
  },
});

export default authSlice;

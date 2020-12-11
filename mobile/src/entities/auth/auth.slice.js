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
      .addCase(checkUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
        state.network.error = false;
        state.network.message = '';
      })
      .addCase(checkUserInfo.rejected, (state, action) => {
        if (action?.payload?.net) {
          state.network.error = true;
          state.network.message = ERRORS.network;
        }
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.network.error = false;
        state.network.message = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (action.payload?.net) {
          state.network.error = true;
          state.network.message = ERRORS.network;
          state.isLoading = false;
        }
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        state.currentUser.profileURL = action.payload;
      })
      .addCase(updateImage.rejected, (state, action) => {
        console.log('updateImage.rejected', action);
      })
      .addCase(updateDescription.fulfilled, (state, action) => {
        state.currentUser.description = action.payload;
      })
      .addCase(updateDescription.rejected, (state, action) => {
        console.log('updateDescription.rejected', action);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.currentUser = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        console.log('logOut.rejected', action);
      });
  },
});

export default authSlice;

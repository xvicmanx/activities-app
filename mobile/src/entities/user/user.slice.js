import { createSlice } from '@reduxjs/toolkit';
import { updateImage, setImageLoader, logOut } from '../user/actions';
import { ERRORS } from '../../constants';

const othersProfileSlice = createSlice({
  name: 'user',
  initialState: {
    imageProfile: {
      isLoading: true,
      displayPencil: false,
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setImageLoader, (state, action) => {
        state.imageProfile.isLoading = action.payload;
        state.imageProfile.displayPencil = !action.payload;
      })
      .addCase(updateImage.pending, (state) => {
        state.imageProfile.isLoading = true;
        state.imageProfile.displayPencil = false;
        state.imageProfile.error = null;
      })
      .addCase(updateImage.fulfilled, (state) => {
        state.imageProfile.isLoading = false;
        state.imageProfile.displayPencil = true;
        state.imageProfile.error = null;
      })
      .addCase(updateImage.rejected, (state) => {
        state.imageProfile.isLoading = false;
        state.imageProfile.displayPencil = true;
        state.imageProfile.error = ERRORS.image;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.imageProfile.error = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        console.log('logOut.rejected', action);
      });
  },
});

export default othersProfileSlice;

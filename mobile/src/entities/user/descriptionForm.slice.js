import { createSlice } from '@reduxjs/toolkit';
import { updateDescription } from './actions';

const descriptionFormSlice = createSlice({
  name: 'user/descriptionForm',
  initialState: {
    isLoading: false,
    modalVisibility: false,
  },
  reducers: {
    setModalVisibility(state, action) {
      state.modalVisibility = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateDescription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateDescription.fulfilled, (state) => {
        state.isLoading = false;
        state.modalVisibility = false;
      })
      .addCase(updateDescription.rejected, (state, action) => {
        console.log('updateDescription.rejected', action);
      });
  },
});

export default descriptionFormSlice;

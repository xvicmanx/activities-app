import { createSlice } from '@reduxjs/toolkit';
import { updateDescription } from './actions';

export default createSlice({
  name: 'user/descriptionForm',
  initialState: {
    isLoading: false,
    modalVisibility: false,
  },
  reducers: {
    setModalVisibility(state, { payload }) {
      state.modalVisibility = payload;
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
      });
  },
});

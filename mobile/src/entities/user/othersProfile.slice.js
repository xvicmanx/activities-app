import { createSlice } from '@reduxjs/toolkit';
import { fetUserById } from './actions';

export default createSlice({
  name: 'othersProfile',
  initialState: {
    isLoading: true,
    entity: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetUserById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.entity = payload;
    });
  },
});

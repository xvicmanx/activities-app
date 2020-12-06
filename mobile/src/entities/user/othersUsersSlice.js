import { createSlice } from '@reduxjs/toolkit';
import { fetUserById } from './actions';

export default createSlice({
  name: 'othersUsers',
  initialState: {
    isLoading: true,
    data: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetUserById.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.data = payload;
    });
  },
});

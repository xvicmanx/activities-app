import { createSlice } from '@reduxjs/toolkit';
import { fetUserById } from './actions';
import { logOut } from '../user/actions';

const othersProfileSlice = createSlice({
  name: 'othersProfile',
  initialState: {
    isLoading: true,
    entity: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetUserById.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.entity = payload;
      })
      .addCase(logOut, (state, { payload }) => {
        state.isLoading = true;
        state.entity = {};
      });
  },
});

export default othersProfileSlice;

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
      .addCase(fetUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.entity = action.payload;
      })
      .addCase(fetUserById.rejected, (state, action) => {
        console.log('fetUserById.rejected', action);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = true;
        state.entity = {};
      })
      .addCase(logOut.rejected, (state, action) => {
        console.log('logOut.rejected', action);
      });
  },
});

export default othersProfileSlice;

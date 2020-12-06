import { createSlice } from '@reduxjs/toolkit';
import { fetchActivities, unjoinActivity, joinActivity } from './actions';

export default createSlice({
  name: 'activities',
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.fulfilled, (state, { payload }) => {})
      .addCase(joinActivity.fulfilled, (state, { payload }) => {})
      .addCase(unjoinActivity.fulfilled, (state, { payload }) => {});
  },
});

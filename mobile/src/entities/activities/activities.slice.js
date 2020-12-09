import { createSlice } from '@reduxjs/toolkit';
import { fetchActivities, unjoinActivity, joinActivity, setLoaderActivity } from './actions';
import { logOut } from '../user/actions';

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    isLoading: true,
    ids: [],
    entities: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLoaderActivity, (state, action) => {
        state.entities[action.payload].isLoading = true;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.entities = action.payload.activities;
        state.ids = action.payload.ids;
        state.isLoading = false;
      })
      .addCase(fetchActivities.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(joinActivity.fulfilled, (state, action) => {
        const { userWillAttend, willAttendCount } = action.payload;

        state.entities[action.payload.id].userWillAttend = userWillAttend;
        state.entities[action.payload.id].willAttendCount = willAttendCount;
        state.entities[action.payload.id].isLoading = false;
      })
      .addCase(joinActivity.rejected, (state, action) => {
        console.log('joinActivity.rejected', action);
      })
      .addCase(unjoinActivity.fulfilled, (state, action) => {
        const { userWillAttend, willAttendCount } = action.payload;

        state.entities[action.payload.id].userWillAttend = userWillAttend;
        state.entities[action.payload.id].willAttendCount = willAttendCount;
        state.entities[action.payload.id].isLoading = false;
      })
      .addCase(unjoinActivity.rejected, (state, action) => {
        console.log('unjoinActivity.rejected', action);
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = true;
        state.ids = [];
        state.entities = {};
      })
      .addCase(logOut.rejected, (state, action) => {
        console.log('logOut.rejected', action);
      });
  },
});

export default activitiesSlice;

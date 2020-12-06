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
      .addCase(setLoaderActivity, (state, { payload }) => {
        state.entities[payload].isLoading = true;
      })
      .addCase(fetchActivities.fulfilled, (state, { payload }) => {
        state.entities = payload.activities;
        state.ids = payload.ids;
        state.isLoading = false;
      })
      .addCase(joinActivity.fulfilled, (state, { payload }) => {
        const { userWillAttend, willAttendCount } = payload;

        state.entities[payload.id].userWillAttend = userWillAttend;
        state.entities[payload.id].willAttendCount = willAttendCount;
        state.entities[payload.id].isLoading = false;
      })

      .addCase(unjoinActivity.fulfilled, (state, { payload }) => {
        const { userWillAttend, willAttendCount } = payload;

        state.entities[payload.id].userWillAttend = userWillAttend;
        state.entities[payload.id].willAttendCount = willAttendCount;
        state.entities[payload.id].isLoading = false;
      })
      .addCase(logOut, (state) => {
        state.isLoading = true;
        state.ids = [];
        state.entities = {};
      });
  },
});

export default activitiesSlice;

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { fetchActivities, unjoinActivity, joinActivity } from './actions';

const activitiesAdapter = createEntityAdapter();

export default createSlice({
  name: 'activities',
  initialState: activitiesAdapter.getInitialState({ isLoading: true }),
  reducers: {
    setParticipants: (state, { payload }) => {
      state.participants.list = payload;
      state.participants.isLoading = false;
    },
    updateParticipant: (state, { payload }) => {
      const activity = state.list.find((activity) => {
        return activity.id === payload.id;
      });

      activity.userWillAttend = payload.userWillAttend;
      activity.willAttendCount = payload.willAttendCount;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.fulfilled, (state, { payload }) => {
        activitiesAdapter.upsertMany(state, payload);
        state.isLoading = false;
      })
      .addCase(joinActivity.fulfilled, (state, { payload }) => {
        activitiesAdapter.updateOne(state, {
          id: payload.id,
          changes: {
            userWillAttend: payload.userWillAttend,
            willAttendCount: payload.willAttendCount,
          },
        });
      })
      .addCase(unjoinActivity.fulfilled, (state, { payload }) => {
        activitiesAdapter.updateOne(state, {
          id: payload.id,
          changes: {
            userWillAttend: payload.userWillAttend,
            willAttendCount: payload.willAttendCount,
          },
        });
      });
  },
});

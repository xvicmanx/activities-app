import { createSlice } from '@reduxjs/toolkit';
import authSlice from '../auth/authSlice';

const INITIAL_STATE = {
  isLoading: true,
  list: [],
  participants: {
    isLoading: true,
    list: [],
  },
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: INITIAL_STATE,
  reducers: {
    setActivities: (state, { payload }) => {
      state.list = payload;
      state.isLoading = false;
    },
    setParticipants: (state, {payload}) => {
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
  extraReducers: {
    [authSlice.actions.logOut]: (state, action) => {
      return { ...INITIAL_STATE };
    },
  },
});

export default activitiesSlice;

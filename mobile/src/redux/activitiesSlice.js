import { createSlice } from '@reduxjs/toolkit';
import ActivitiesServices from '../services/activities';

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: {
    isLoading: true,
    activities: [],
    participants: {
      isLoading: true,
      list: [],
    },
  },
  reducers: {
    setActivities: (state, action) => {
      state.activities = action.payload;
      state.isLoading = false;
    },
    setParticipants: (state, action) => {
      state.participants.list = action.payload;
      state.participants.isLoading = false;
    },
    updateParticipant: (state, action) => {
      const activity = state.activities.find((activity) => {
        return activity.id === action.payload.id;
      });

      activity.userWillAttend = action.payload.userWillAttend;
      activity.willAttendCount = action.payload.willAttendCount;
    },
  },
});

export const {
  setActivities,
  setParticipants,
  updateParticipant,
} = activitiesSlice.actions;

export const fetchActivities = (token) => async (dispatch) => {
  try {
    const res = await ActivitiesServices.getActivities(token);

    if (res.success) {
      dispatch(setActivities(res.activities));
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchParticipants = (activityId, token) => async (dispatch) => {
  try {
    const res = await ActivitiesServices.getParticipants(activityId, token);

    if (res.success) {
      dispatch(setParticipants(res.participants));
    }
  } catch (error) {
    console.log(error);
  }
};

export const joinActivity = (activityId, token) => async (dispatch) => {
  try {
    const res = await ActivitiesServices.joinActivity(activityId, token);

    if (res.success) {
      dispatch(updateParticipant(res.activity));
    }
  } catch (error) {
    console.log(error);
  }
};

export const unjoinActivity = (activityId, token) => async (dispatch) => {
  try {
    const res = await ActivitiesServices.unjoinActivity(activityId, token);

    if (res.success) {
      dispatch(updateParticipant(res.activity));
    }
  } catch (error) {
    console.log(error);
  }
};

export default activitiesSlice.reducer;

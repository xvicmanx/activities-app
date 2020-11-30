import { createSlice } from '@reduxjs/toolkit';
import ActivitiesServices from '../services/activities';
import { logOut } from './commonActions';

const INITIAL_STATE = {
  isLoading: true,
  activities: [],
  participants: {
    isLoading: true,
    list: [],
  },
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState: INITIAL_STATE,
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
  extraReducers: {
    [logOut]: (state, action) => {
      return { ...INITIAL_STATE };
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

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
  },
});

export const { setActivities, setParticipants } = activitiesSlice.actions;

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

<<<<<<< HEAD
export const fetchParticipants = (activityId, token) => async (dispatch) => {
  try {
    const res = await ActivitiesServices.getParticipants(activityId, token);

    if (res.success) {
      dispatch(setParticipants(res.participants));
=======
export const fetchParticipants = (token) => async (dispatch) => {
  try {
    //const res = await ActivitiesServices.getActivities(token);

    if (res.success) {
      // dispatch(setActivities(res.activities));
>>>>>>> 98de2a0 (save)
    }
  } catch (error) {
    console.log(error);
  }
};

export default activitiesSlice.reducer;

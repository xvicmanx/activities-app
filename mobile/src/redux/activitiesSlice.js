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
  },
});

export const { setActivities } = activitiesSlice.actions;

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

export const fetchParticipants = (token) => async (dispatch) => {
  try {
    //const res = await ActivitiesServices.getActivities(token);

    if (res.success) {
      // dispatch(setActivities(res.activities));
    }
  } catch (error) {
    console.log(error);
  }
};

export default activitiesSlice.reducer;

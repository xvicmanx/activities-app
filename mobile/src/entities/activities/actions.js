import ActivitiesService from './activitiesService';
import activitiesSlice from './activitiesSlice';

export const fetchActivities = (token) => async (dispatch) => {
  try {
    const res = await ActivitiesService.getActivities(token);

    if (res.success) {
      dispatch(activitiesSlice.actions.setActivities(res.activities));
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchParticipants = (activityId, token) => async (dispatch) => {
  try {
    const res = await ActivitiesService.getParticipants(activityId, token);

    if (res.success) {
      dispatch(activitiesSlice.actions.setParticipants(res.participants));
    }
  } catch (error) {
    console.log(error);
  }
};

export const joinActivity = (activityId, token) => async (dispatch) => {
  try {
    const res = await ActivitiesService.joinActivity(activityId, token);

    if (res.success) {
      dispatch(activitiesSlice.actions.updateParticipant(res.activity));
    }
  } catch (error) {
    console.log(error);
  }
};

export const unjoinActivity = (activityId, token) => async (dispatch) => {
  try {
    const res = await ActivitiesService.unjoinActivity(activityId, token);

    if (res.success) {
      dispatch(activitiesSlice.actions.updateParticipant(res.activity));
    }
  } catch (error) {
    console.log(error);
  }
};

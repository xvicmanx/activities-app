import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';
import ActivitiesService from './activities.service';

const activityEntity = new schema.Entity('activities');
const participantEntity = new schema.Entity('participants');

export const setLoaderParticipants = createAction('participants/setLoader');
export const setLoaderActivity = createAction('activity/setLoader');

export const fetchActivities = createAsyncThunk(
  'activities/fetchActivities',
  async (arg, thunkAPI) => {
    const token = thunkAPI.getState().auth.currentUser.token;
    const res = await ActivitiesService.getActivities(token);

    if (!res.success) {
      throw new Error();
    }

    const normalized = normalize(res.activities, [activityEntity]);
    const { activities } = normalized.entities;

    if (activities) {
      Object.keys(activities).forEach((key) => {
        activities[key].isLoading = false;
      });
    }

    return {
      ids: normalized.result,
      activities,
    };
  }
);

export const fetchParticipants = createAsyncThunk(
  'activities/fetchParticipants',
  async (activityId, thunkAPI) => {
    const token = thunkAPI.getState().auth.currentUser.token;
    const res = await ActivitiesService.getParticipants(activityId, token);

    if (res.success) {
      const normalized = normalize(res.participants, [participantEntity]);
      const { participants } = normalized.entities;

      return { ids: normalized.result, participants };
    }
  }
);

export const joinActivity = createAsyncThunk(
  'activities/joinActivity',
  async (activityId, thunkAPI) => {
    thunkAPI.dispatch(setLoaderActivity(activityId));

    const token = thunkAPI.getState().auth.currentUser.token;
    const res = await ActivitiesService.joinActivity(activityId, token);

    if (res.success) {
      return res.activity;
    }
  }
);

export const unjoinActivity = createAsyncThunk(
  'activities/unjoinActivity',
  async (activityId, thunkAPI) => {
    thunkAPI.dispatch(setLoaderActivity(activityId));

    const token = thunkAPI.getState().auth.currentUser.token;
    const res = await ActivitiesService.unjoinActivity(activityId, token);

    if (res.success) {
      return res.activity;
    }
  }
);

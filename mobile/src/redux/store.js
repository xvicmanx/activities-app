import { configureStore } from '@reduxjs/toolkit';
import signinSlice from './signinSlice';
import authSlice from './authSlice';
import activitiesSlice from './activitiesSlice';
import communitiesSlice from './communitiesSlice';
import otherUserSlice from './otherUserSlice';

const store = configureStore({
  reducer: {
    signin: signinSlice,
    auth: authSlice,
    communities: communitiesSlice,
    activities: activitiesSlice,
    otherUser: otherUserSlice,
  },
});

export default store;

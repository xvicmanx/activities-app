import { configureStore } from '@reduxjs/toolkit';

import authSlice from './entities/auth/auth.slice';
import loginForm from './entities/auth/loginForm.slice';
import activities from './entities/activities/activities.slice';
import participants from './entities/activities/participants.slice';
import profile from './entities/user/profile.slice';
import othersProfile from './entities/user/othersProfile.slice';
// import profileImage from './entities/user/profileImage.slice';

export default configureStore({
  reducer: {
    auth: authSlice.reducer,
    loginForm: loginForm.reducer,
    activities: activities.reducer,
    participants: participants.reducer,
    profile: profile.reducer,
    othersProfile: othersProfile.reducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';

import auth from './entities/auth/auth.slice';
import loginForm from './entities/auth/loginForm.slice';
import activities from './entities/activities/activities.slice';
import participants from './entities/activities/participants.slice';
import descriptionForm from './entities/user/descriptionForm.slice';
import othersProfile from './entities/user/othersProfile.slice';
import changePasswordForm from './entities/user/changePasswordForm.slice';

const store = configureStore({
  reducer: {
    auth: auth.reducer,
    loginForm: loginForm.reducer,
    activities: activities.reducer,
    participants: participants.reducer,
    othersProfile: othersProfile.reducer,
    descriptionForm: descriptionForm.reducer,
    changePasswordForm: changePasswordForm.reducer,
  },
});

export default store;

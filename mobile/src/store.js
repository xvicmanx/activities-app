import { configureStore } from '@reduxjs/toolkit';

// import authSlice from './entities/auth/authSlice';
// import activitiesSlice from './entities/activities/activitiesSlice';
// import communitiesSlice from './entities/communities/communitiesSlice';
// import userSlice from './entities/user/userSlice';

import authSlice from './entities/auth/authSliceTemp';
import loginFormSlice from './entities/auth/loginFormSlice';
import activitiesSlice from './entities/activities/activitiesSlice';
import participantsSlice from './entities/activities/participantsSlice';

export default configureStore({
  reducer: {
    // auth: authSlice.reducer,
    // communities: communitiesSlice.reducer,
    // activities: activitiesSlice.reducer,
    // user: userSlice.reducer,
    auth: authSlice.reducer,
    loginForm: loginFormSlice.reducer,
    activities: activitiesSlice.reducer,
    participants: participantsSlice.reducer,
  },
});

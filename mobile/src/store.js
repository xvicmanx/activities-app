import { configureStore } from '@reduxjs/toolkit';

import authSlice from './entities/auth/authSlice';
import activitiesSlice from './entities/activities/activitiesSlice';
import communitiesSlice from './entities/communities/communitiesSlice';
import userSlice from './entities/user/userSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    communities: communitiesSlice.reducer,
    activities: activitiesSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;

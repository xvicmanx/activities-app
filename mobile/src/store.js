import { configureStore } from '@reduxjs/toolkit';

import authSlice from './entities/auth/authSlice';
import activitiesSlice from './entities/activities/activitiesSlice';
import communitiesSlice from './entities/communities/communitiesSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    communities: communitiesSlice.reducer,
    activities: activitiesSlice.reducer,
  },
});

export default store;

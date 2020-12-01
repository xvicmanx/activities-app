import { configureStore } from '@reduxjs/toolkit';

import authSlice from './entities/auth/authSlice';
import activitiesSlice from './entities/activities/activitiesSlice';
// import communitiesSlice from './communitiesSlice';
// import otherUserSlice from './otherUserSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    // communities: communitiesSlice,
    activities: activitiesSlice.reducer,
    // otherUser: otherUserSlice,
  },
});

export default store;

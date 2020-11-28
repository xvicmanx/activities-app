import { configureStore } from '@reduxjs/toolkit';

import signinSlice from './signinSlice';
import authSlice from './authSlice';





import communitiesSlice from './communitiesSlice';





const store = configureStore({
  reducer: {
    signin: signinSlice,
    auth: authSlice,




    communities: communitiesSlice
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';

import signinSlice from './signinSlice';
import authSlice from './authSlice';

const store = configureStore({
  reducer: {
    signin: signinSlice,
    auth: authSlice,
  },
});

export default store;

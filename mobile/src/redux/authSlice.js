import { createSlice } from '@reduxjs/toolkit';
import { loginUserAction } from './signinSlice';
import AuthServices from '../services/auth';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [loginUserAction]: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setUser, setLoading } = authSlice.actions;

export const checkUserInfo = () => async (dispatch) => {
  try {
    const res = await AuthServices.checkUserInfo();

    if (res.code === 'NOT_AUTHORIZED') {
      dispatch(setUser(null));
      return;
    }

    //
  } catch (error) {
    console.log(error);
  }
};

export default authSlice.reducer;

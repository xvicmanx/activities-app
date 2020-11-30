import { createSlice } from '@reduxjs/toolkit';
import AuthService from '../services/auth';
import { ERRORS } from '../constants';
import { logOut } from './commonActions';

const INITIAL_STATE = {
  isLoading: false,
  error: null,
};

const signinSlice = createSlice({
  name: 'signin',
  initialState: INITIAL_STATE,
  reducers: {
    loginUserStarted: (state, action) => {
      state.isLoading = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    loginUserAction: (state, action) => {
      state.isLoading = false;
    },
  },
  extraReducers: {
    [logOut]: (state, action) => {
      return { ...INITIAL_STATE };
    },
  },
});

export const {
  loginUserStarted,
  setError,
  loginUserAction,
} = signinSlice.actions;

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginUserStarted());

  try {
    const res = await AuthService.loginUser(email, password);

    if (res.code === 'INVALID_PARAMETERS') {
      dispatch(setError(ERRORS.email));
      return;
    }

    if (res.success) {
      dispatch(
        loginUserAction({
          exp: res.exp,
          token: res.token,
          ...res.user,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export default signinSlice.reducer;

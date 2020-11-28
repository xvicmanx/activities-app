import { createSlice } from '@reduxjs/toolkit';
import AuthService from '../services/auth';
import { ERRORS } from '../constants/errors';

const signinSlice = createSlice({
  name: 'signin',
  initialState: {
    isLoading: false,
    error: null,
  },
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

    console.log(res);

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

import { createSlice } from '@reduxjs/toolkit';

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
      state.loginLoader = false;
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
    //
  } catch (error) {
    console.log(error);
  }
};

export default signinSlice.reducer;

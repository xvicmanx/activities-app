import { createSlice } from '@reduxjs/toolkit';
import { Auth } from '../services/auth';
import { loginUserAction } from './signinSlice';

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
    const { status, data } = await Auth.isUserLogged();

    if (status) {
      dispatch(setUser(data));
    } else {
      dispatch(setLoading(false));
    }
  } catch (error) {
    console.log(error);
  }
};

export default authSlice.reducer;

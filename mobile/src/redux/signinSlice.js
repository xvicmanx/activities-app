import { createSlice } from '@reduxjs/toolkit';
import { Auth } from '../services/auth';
import { ERRORS } from '../constants/errors';

const signinSlice = createSlice({
  name: 'signin',
  initialState: {
    isLoading: true,
    users: [],
    userSelected: null,
    loginLoader: false,
    error: null,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
      state.userSelected = action.payload[0];
      state.isLoading = false;
      state.loginLoader = false;
    },
    setUserSelected: (state, action) => {
      state.userSelected = action.payload;
    },
    loginUserStarted: (state, action) => {
      state.loginLoader = true;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loginLoader = false;
    },
    loginUserAction: (state, action) => {
      state.loginLoader = false;
    },
  },
});

export const {
  setUsers,
  setUserSelected,
  loginUserStarted,
  setError,
  loginUserAction,
} = signinSlice.actions;

export const fetchUsers = () => async (dispatch) => {
  try {
    const users = await Auth.getUsers();
    dispatch(setUsers(users));
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(loginUserStarted());

  try {
    const user = await Auth.loginUser(email, password);
    if (user) {
      dispatch(loginUserAction(user));
    } else {
      dispatch(setError(ERRORS.password.incorrect));
    }
  } catch (error) {
    console.log(error);
  }
};

export default signinSlice.reducer;

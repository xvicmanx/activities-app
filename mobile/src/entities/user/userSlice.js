import { createSlice } from '@reduxjs/toolkit';
import authSlice from '../auth/authSlice';

const INITIAL_STATE = {
  previousPassword: '',
  password: '',
  confirmPassword: '',
  isEditing: false,
  isLoading: false,
  errors: {
    previousPassword: null,
    password: null,
    confirmPassword: null,
  },
  message: {
    visibility: false,
    success: false,
    text: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    handleChange(state, action) {
      const { name, value } = action.payload;
      state[name] = value;
      state.errors[name] = null;

      state.message = { ...INITIAL_STATE.message };
    },
    setIsEditing(state, action) {
      state.isEditing = !state.isEditing;
    },
    setErrors(state, action) {
      state.errors = { ...state.errors, ...action.payload };
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    setMessage(state, action) {
      state.previousPassword = '';
      state.password = '';
      state.confirmPassword = '';
      state.isLoading = false;
      state.errors = { ...INITIAL_STATE.errors };
      state.message = action.payload;
    },
  },
  extraReducers: {
    [authSlice.actions.logOut]: (state, action) => {
      return { ...INITIAL_STATE };
    },
  },
});

export default userSlice;

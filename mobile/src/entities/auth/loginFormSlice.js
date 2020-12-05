import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './actions';

export default createSlice({
  name: 'auth/loginForm',
  initialState: {
    isLoading: false,
    email: {
      value: '',
      error: null,
    },
    password: {
      value: '',
      error: null,
    },
  },
  reducers: {
    onChange(state, { payload }) {
      const { name, value } = payload;
      state[name].value = value;
      state[name].error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.password.value = '';
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        const { name, value, clean } = payload;

        state.isLoading = false;
        state[name].error = value;

        if (clean) {
          state.password.value = '';
        }
      });
  },
});

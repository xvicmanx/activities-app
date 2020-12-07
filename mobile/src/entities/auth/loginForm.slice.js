import { createSlice } from '@reduxjs/toolkit';
import { loginUser, onChange, checkUserInfo } from './actions';

const loginFormSlice = createSlice({
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(onChange, (state, { payload }) => {
        const { name, value } = payload;
        state[name].value = value;
        state[name].error = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.password.value = '';
      })
      .addCase(checkUserInfo.rejected, (state, { payload }) => {
        if (payload.email) {
          state.email.value = payload.email;
        }
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

export default loginFormSlice;

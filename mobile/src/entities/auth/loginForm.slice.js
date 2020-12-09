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
      .addCase(onChange, (state, action) => {
        const { name, value } = action.payload;
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
      .addCase(loginUser.rejected, (state, action) => {
        const { name, value, clean } = action.payload;
        state.isLoading = false;
        state[name].error = value;
        if (clean) {
          state.password.value = '';
        }
      })
      .addCase(checkUserInfo.rejected, (state, action) => {
        if (action.payload.email) {
          state.email.value = action.payload.email;
        }
      });
  },
});

export default loginFormSlice;

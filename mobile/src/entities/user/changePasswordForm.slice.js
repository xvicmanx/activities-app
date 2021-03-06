import { createSlice } from '@reduxjs/toolkit';
import { onChange, updatePassword, logOut } from './actions';

const changePasswordFormSlice = createSlice({
  name: 'user/changePasswordForm',
  initialState: {
    isLoading: false,
    isEditing: false,

    message: {
      error: null,
      value: null,
    },
    previousPassword: {
      value: '',
      error: null,
    },
    password: {
      value: '',
      error: null,
    },
    confirmPassword: {
      value: '',
      error: null,
    },
  },
  reducers: {
    setEditing(state) {
      state.isEditing = !state.isEditing;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onChange, (state, action) => {
        const { name, value } = action.payload;
        state[name].value = value;
        state[name].error = null;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.previousPassword.value = '';
        state.password.value = '';
        state.confirmPassword.value = '';
        state.message.error = action.payload.error;
        state.message.value = action.payload.text;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        const { name, value, clean } = action.payload;
        state[name].error = value;
        if (clean) {
          state.password.value = '';
        }
        state.isLoading = false;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.message.error = null;
        state.message.value = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        console.log('logOut.rejected', action);
      });
  },
});

export default changePasswordFormSlice;

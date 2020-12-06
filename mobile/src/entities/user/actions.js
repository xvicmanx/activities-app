import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import UserService from './user.service';
import ERRORS from '../../constants/errors';

export const onChange = createAction('user/onChange');
export const logOut = createAction('user/logOut');

export const fetUserById = createAsyncThunk('user/fetUserById', async (userId, thunkAPI) => {
  const token = thunkAPI.getState().auth.currentUser.token;
  const res = await UserService.fetUserById(userId, token);

  if (res.success) {
    return res.user;
  }
});

export const updatePassword = createAsyncThunk('user/update/password', async (arg, thunkAPI) => {
  const token = thunkAPI.getState().auth.currentUser.token;
  const { previousPassword, password, confirmPassword } = thunkAPI.getState().changePasswordForm;

  if (password.value.length < 6) {
    return thunkAPI.rejectWithValue({
      name: 'password',
      value: ERRORS.password.lessThanSixCharacters,
    });
  } else if (password.value !== confirmPassword.value) {
    return thunkAPI.rejectWithValue({
      name: 'confirmPassword',
      value: ERRORS.password.dontMatch,
    });
  } else if (previousPassword.value.length === 0) {
    return thunkAPI.rejectWithValue({
      name: 'previousPassword',
      value: ERRORS.empty,
    });
  }

  const payload = {
    previousPassword: previousPassword.value,
    password: password.value,
    confirmPassword: confirmPassword.value,
  };

  const res = await UserService.updatePassword(payload, token);

  if (res.success) {
    return { error: false, text: 'La contraseña ha sido cambiada con éxito' };
  } else {
    return { error: true, text: 'No se pudo cambiar la contraseña' };
  }
});

export const updateDescription = createAsyncThunk(
  'user/update/description',
  async (description, thunkAPI) => {
    const token = thunkAPI.getState().auth.currentUser.token;
    await UserService.updateDescription(description, token);
    return description;
  }
);

export const updateImage = createAsyncThunk('user/update/image', async (imageData, thunkAPI) => {
  const token = thunkAPI.getState().auth.currentUser.token;
  const res = await UserService.uploadImage(imageData, token);

  if (res.success) {
    return res.profileURL;
  }
});

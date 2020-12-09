import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserService from './user.service';
import ERRORS from '../../constants/errors';

export const onChange = createAction('user/onChange');
export const setImageLoader = createAction('user/setImageLoader');

export const logOut = createAsyncThunk('user/logOut', async () => {
  await AsyncStorage.removeItem('userToken');
});

export const fetUserById = createAsyncThunk('user/fetUserById', async (userId, thunkAPI) => {
  const token = thunkAPI.getState().auth.currentUser.token;
  const res = await UserService.fetUserById(userId, token);

  if (!res.success) {
    throw new Error('fetch user by id fails');
  }

  return res.user;
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

  if (!res.success) {
    return { error: true, text: 'No se pudo cambiar la contraseña' };
  }

  return { error: false, text: 'La contraseña ha sido cambiada con éxito' };
});

export const updateDescription = createAsyncThunk(
  'user/update/description',
  async (newDescription, thunkAPI) => {
    const { token, description } = thunkAPI.getState().auth.currentUser;

    if (newDescription !== description) {
      await UserService.updateDescription(newDescription, token);
    }

    return newDescription;
  }
);

export const updateImage = createAsyncThunk('user/update/image', async (imageData, thunkAPI) => {
  const token = thunkAPI.getState().auth.currentUser.token;
  const res = await UserService.uploadImage(imageData, token);

  if (!res.success) {
    throw new Error();
  }

  return res.profileURL;
});

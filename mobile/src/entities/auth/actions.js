import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from './auth.service';
import ERRORS from '../../constants/errors';
import REG_EXP from '../../constants/regExp';

export const onChange = createAction('auth/loginForm/onChange');

export const checkUserInfo = createAsyncThunk('auth/checkUserInfo', async (arg, thunkAPI) => {
  const token = await AsyncStorage.getItem('userToken');

  if (!token) {
    return null;
  }

  const res = await AuthService.checkUserInfo(token);

  if (res.code === 'NOT_AUTHORIZED') {
    return null;
  }

  const user = {
    exp: res.exp,
    token: res.token,
    ...res.user,
  };

  if (res.success) {
    return user;
  }
});

export const loginUser = createAsyncThunk('auth/loginUser', async (arg, thunkAPI) => {
  const email = thunkAPI.getState().loginForm.email.value;
  const password = thunkAPI.getState().loginForm.password.value;

  if (!email.match(REG_EXP.validEmail)) {
    return thunkAPI.rejectWithValue({
      name: 'email',
      value: ERRORS.email.emailFormat,
    });
  }

  if (password.length < 6) {
    return thunkAPI.rejectWithValue({
      name: 'password',
      value: ERRORS.password.lessThanSixCharacters,
    });
  }

  const res = await AuthService.loginUser(email, password);

  if (res.code === 'INVALID_PARAMETERS') {
    return thunkAPI.rejectWithValue({
      name: 'password',
      value: ERRORS.email.invalid,
      clean: true,
    });
  }

  if (res.success) {
    await AsyncStorage.setItem('userToken', res.token);

    const user = {
      exp: res.exp,
      token: res.token,
      ...res.user,
    };

    return user;
  }
});

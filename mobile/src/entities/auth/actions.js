import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from './auth.service';
import ERRORS from '../../constants/errors';
import REG_EXP from '../../constants/regExp';

export const onChange = createAction('auth/onChange');

export const checkUserInfo = createAsyncThunk('auth/checkUserInfo', async () => {
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

export const loginUser = createAsyncThunk('auth/login', async (arg, thunkAPI) => {
  const { email, password } = thunkAPI.getState().loginForm;

  if (!email.value.match(REG_EXP.validEmail)) {
    return thunkAPI.rejectWithValue({
      name: 'email',
      value: ERRORS.email.emailFormat,
    });
  }

  if (password.value.length < 6) {
    return thunkAPI.rejectWithValue({
      name: 'password',
      value: ERRORS.password.lessThanSixCharacters,
    });
  }

  const res = await AuthService.loginUser(email.value, password.value);

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

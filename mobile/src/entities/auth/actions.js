import { createAsyncThunk, createAction } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from './auth.service';
import ERRORS from '../../constants/errors';
import REG_EXP from '../../constants/regExp';

export const onChange = createAction('auth/onChange');

export const checkUserInfo = createAsyncThunk('auth/checkUserInfo', async (arg, thunkAPI) => {
  const token = await AsyncStorage.getItem('userToken');
  const email = await AsyncStorage.getItem('userEmail');

  if (!token) {
    return thunkAPI.rejectWithValue({
      net: false,
      email,
    });
  }

  const res = await AuthService.checkUserInfo(token);

  if (!res.success) {
    return thunkAPI.rejectWithValue({
      net: false,
      email,
    });
  }

  return {
    exp: res.exp,
    token: res.token,
    ...res.user,
  };
});

export const loginUser = createAsyncThunk('auth/login', async (arg, thunkAPI) => {
  const { email, password } = thunkAPI.getState().loginForm;

  if (!email.value.match(REG_EXP.validEmail)) {
    return thunkAPI.rejectWithValue({
      name: 'email',
      value: ERRORS.email.emailFormat,
      net: false,
    });
  }

  if (password.value.length < 6) {
    return thunkAPI.rejectWithValue({
      name: 'password',
      value: ERRORS.password.lessThanSixCharacters,
      net: false,
    });
  }

  const res = await AuthService.loginUser(email.value, password.value);

  if (!res.success) {
    return thunkAPI.rejectWithValue({
      name: 'password',
      value: ERRORS.email.invalid,
      clean: true,
      net: false,
    });
  }

  await AsyncStorage.setItem('userToken', res.token);
  await AsyncStorage.setItem('userEmail', res.user.email);

  return {
    exp: res.exp,
    token: res.token,
    ...res.user,
  };
});

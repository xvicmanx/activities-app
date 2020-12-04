import authSlice from './authSlice';
import AuthService from './authService';
import { ERRORS } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkUserInfo = () => async (dispatch) => {
  try {
    const token = await AsyncStorage.getItem('userToken');

    if (!token) {
      dispatch(authSlice.actions.setCurrentUser(null));
      return;
    }

    const res = await AuthService.checkUserInfo(token);

    if (res.code === 'NOT_AUTHORIZED') {
      dispatch(authSlice.actions.setCurrentUser(null));
      return;
    }

    if (res.success) {
      dispatch(
        authSlice.actions.setCurrentUser({
          exp: res.exp,
          token: res.token,
          ...res.user,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch(authSlice.actions.loginUserStarted());

  try {
    const res = await AuthService.loginUser(email, password);

    if (res.code === 'INVALID_PARAMETERS') {
      dispatch(authSlice.actions.setSigninErrors(ERRORS.email));
      return;
    }

    if (res.success) {
      await AsyncStorage.setItem('userToken', res.token);

      dispatch(
        authSlice.actions.setCurrentUser({
          exp: res.exp,
          token: res.token,
          ...res.user,
        })
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetUserById = (userId, token) => async (dispatch) => {
  try {
    const res = await AuthService.fetUserById(userId, token);

    if (res.success) {
      dispatch(authSlice.actions.setSpecificUser(res.user));
    }
  } catch (error) {
    console.log(error);
  }
};

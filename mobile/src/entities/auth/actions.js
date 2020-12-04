import authSlice from './authSlice';
import AuthService from './authService';
import { ERRORS } from '../../constants';

export const checkUserInfo = () => async (dispatch) => {
  try {
    // const res = await AuthService.checkUserInfo();

    // if (res.code === 'NOT_AUTHORIZED') {
    //   dispatch(authSlice.actions.setCurrentUser(null));
    //   return;
    // }
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
      dispatch(
        authSlice.actions.loginUser({
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

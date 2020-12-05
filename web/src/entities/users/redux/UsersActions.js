import cookies from 'browser-cookies';
import {
  SET_CURRENT_USER,
  LOG_OUT_CURRENT_USER,
  SET_USERS_LOADING_STATE,
  SET_USER_ERROR,
  SET_USERS_ERROR,
  SET_USERS,
} from './UsersActionTypes';

import * as Users from '../services/UsersService';

const storeToken = (token) => {
  cookies.set('jwt', token, { expires: 1 });
};

export const clearToken = () => {
  cookies.erase('jwt'); 
};

export const readTokenFromCookie = () => cookies.get('jwt');

export const loadUserFromToken = ({ token, shouldLoadToken }) => async (dispatch) => {
  if (!shouldLoadToken) {
    return;
  }

  dispatch({
    type: SET_USERS_LOADING_STATE,
    payload: true,
  });

  clearToken();

  const res = await Users.loadUserFromToken(token);

  if (res.success) {
    storeToken(res.token); 
    dispatch({
      type: SET_CURRENT_USER,
      payload: { ...res.user, token: res.token }
    });
  } else {
    dispatch({
      type: SET_USER_ERROR,
      payload: res.message,
    });
  }

  dispatch({
    type: SET_USERS_LOADING_STATE,
    payload: false,
  });
};

export const loginUser = (email, password) => async (dispatch) => {
  dispatch({
    type: SET_USERS_LOADING_STATE,
    payload: true,
  });

  const res = await Users.loginUser(email, password);

  if (res && res.success) {
    storeToken(res.token); 
    dispatch({
      type: SET_CURRENT_USER,
      payload: { ...res.user, token: res.token }
    });
  } else {
    dispatch({
      type: SET_USER_ERROR,
      payload: res ? res.message : 'Error',
    });
  }

  dispatch({
    type: SET_USERS_LOADING_STATE,
    payload: false,
  });
};

export const logOutUser = () => async (dispatch) => {
  clearToken(); 
  dispatch({
    type: LOG_OUT_CURRENT_USER
  });
};


export const fetchUsers = (token) => async (dispatch) => {
  dispatch({
    type: SET_USERS_LOADING_STATE,
    payload: true,
  });

  const res = await Users.fetchUsers(token);

  if (res.success) {
    dispatch({
      type: SET_USERS,
      payload: res.users,
    });
  } else {
    dispatch({
      type: SET_USERS_ERROR,
      payload: res.message,
    });
  }

  dispatch({
    type: SET_USERS_LOADING_STATE,
    payload: false,
  });
};
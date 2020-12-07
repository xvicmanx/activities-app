import {
  SET_CURRENT_USER,
  LOG_OUT_CURRENT_USER,
  SET_USERS_LOADING_STATE,
  SET_USER_ERROR,
  SET_USERS_ERROR,
  SET_USERS,
} from './UsersActionTypes';

export const INITIAL_STATE = {
  data: null,
  users: null,
  loading: false,
  error: null,
};

const UsersReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_USERS_LOADING_STATE:
      return {
        ...state,
        loading: payload,
        error: payload ? null : state.error,
      };

    case SET_USER_ERROR:
    case SET_USERS_ERROR:
      return {
        ...state,
        error: payload,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        data: payload,
      };

    case SET_USERS:
      return {
        ...state,
        users: payload,
      };

    case LOG_OUT_CURRENT_USER:
      return {
        ...state,
        data: null,
      };

    default:
      return state;
  }
};

export default UsersReducer;

import {
  SET_CURRENT_USER,
  LOG_OUT_CURRENT_USER,
  SET_USERS_LOADING_STATE,
  SET_USER_ERROR
} from './UsersActionTypes';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null
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
        return {
          ...state,
          error: payload,
        };

    case SET_CURRENT_USER:
      return {
        ...state,
        data: payload
      };

    case LOG_OUT_CURRENT_USER:
      return {
        ...state,
        data: null
      };

    default:
      return state;
  }
};

export default UsersReducer;

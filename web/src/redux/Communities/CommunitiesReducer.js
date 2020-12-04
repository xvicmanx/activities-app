import {
  SET_COMMUNITIES,
  SET_COMMUNITIES_LOADING_STATE,
  SET_COMMUNITIES_ERROR
} from './CommunitiesActionTypes';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null
};

const CommunitiesReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case SET_COMMUNITIES_LOADING_STATE:
      return {
        ...state,
        loading: payload,
        error: payload ? null : state.error,
      };

    case SET_COMMUNITIES_ERROR:
        return {
          ...state,
          error: payload,
        };

    case SET_COMMUNITIES:
      return {
        ...state,
        data: payload
      };

    default:
      return state;
  }
};

export default CommunitiesReducer;

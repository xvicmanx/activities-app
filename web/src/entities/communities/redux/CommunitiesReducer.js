import {
  SET_COMMUNITIES,
  SET_COMMUNITIES_LOADING_STATE,
  SET_COMMUNITIES_ERROR,
  SET_COMMUNITY,
  SET_COMMUNITY_LOADING_STATE,
  SET_COMMUNITY_ERROR,
  ADD_MEMBER,
} from './CommunitiesActionTypes';

const INITIAL_STATE = {
  communities: null,
  community: null,
  member: null,
  loading: false,
  error: null,
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
        communities: payload,
      };

    case ADD_MEMBER:
      return {
        ...state,
        community: {
          ...state.community,
          members: [...(state.community.members || []), payload],
        },
      };

    case SET_COMMUNITY_LOADING_STATE:
      return {
        ...state,
        loading: payload,
        error: payload ? null : state.error,
      };

    case SET_COMMUNITY_ERROR:
      return {
        ...state,
        error: payload,
      };

    case SET_COMMUNITY:
      return {
        ...state,
        community: payload,
      };

    default:
      return state;
  }
};

export default CommunitiesReducer;

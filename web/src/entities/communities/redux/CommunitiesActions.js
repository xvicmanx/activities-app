import {
  SET_COMMUNITIES,
  SET_COMMUNITIES_LOADING_STATE,
  SET_COMMUNITIES_ERROR,
  SET_COMMUNITY,
  SET_COMMUNITY_LOADING_STATE,
  SET_COMMUNITY_ERROR,
  ADD_MEMBER,
} from './CommunitiesActionTypes';

import CommunitiesService from '../services/CommunitiesService';

export const fetchCommunities = () => async (dispatch) => {
  dispatch({
    type: SET_COMMUNITIES_LOADING_STATE,
    payload: true,
  });

  const res = await CommunitiesService.fetchCommunities();

  if (res.success) {
    dispatch({
      type: SET_COMMUNITIES,
      payload: res.communities,
    });
  } else {
    dispatch({
      type: SET_COMMUNITIES_ERROR,
      payload: res.message,
    });
  }

  dispatch({
    type: SET_COMMUNITIES_LOADING_STATE,
    payload: false,
  });
};

export const fetchCommunity = (id) => async (dispatch) => {
  dispatch({
    type: SET_COMMUNITY_LOADING_STATE,
    payload: true,
  });

  const res = await CommunitiesService.fetchCommunity(id);

  if (res.success) {
    dispatch({
      type: SET_COMMUNITY,
      payload: res.community,
    });
  } else {
    dispatch({
      type: SET_COMMUNITY_ERROR,
      payload: res.message,
    });
  }

  dispatch({
    type: SET_COMMUNITY_LOADING_STATE,
    payload: false,
  });
};

export const addMember = (communityId, memberId, coordinates) => async (
  dispatch
) => {
  dispatch({
    type: SET_COMMUNITY_LOADING_STATE,
    payload: true,
  });

  const res = await CommunitiesService.addMember(
    communityId,
    memberId,
    coordinates
  );

  if (res && res.success) {
    dispatch({
      type: ADD_MEMBER,
      payload: res.member,
    });
  } else {
    dispatch({
      type: SET_COMMUNITY_ERROR,
      payload: res.message,
    });
  }

  dispatch({
    type: SET_COMMUNITY_LOADING_STATE,
    payload: false,
  });
};

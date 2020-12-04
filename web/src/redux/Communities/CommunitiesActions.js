import cookies from 'browser-cookies';
import {
  SET_COMMUNITIES,
  SET_COMMUNITIES_LOADING_STATE,
  SET_COMMUNITIES_ERROR
} from './CommunitiesActionTypes';

import { Communities } from '../../Services';

export const fetchCommunities = (token) => async (dispatch) => {
  dispatch({
    type: SET_COMMUNITIES_LOADING_STATE,
    payload: true,
  });

  const res = await Communities.fetchCommunities(token);

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

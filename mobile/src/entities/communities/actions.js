import CommunitiesService from './communitiesService';
import communitiesSlice from './communitiesSlice';

export const fetchCommunities = (token) => async (dispatch) => {
  try {
    const res = await CommunitiesService.fetchCommunities(token);

    if (res.success) {
      dispatch(communitiesSlice.actions.setCommunities(res.communities));
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchCommunityById = (comunityId, token) => async (dispatch) => {
  try {
    const res = await CommunitiesService.fetchCommunityById(comunityId, token);

    if (res.success) {
      dispatch(communitiesSlice.actions.setCommunity(res.community));
    }
  } catch (error) {
    console.log(error);
  }
};

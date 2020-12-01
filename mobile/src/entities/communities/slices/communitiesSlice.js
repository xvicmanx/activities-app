import { createSlice } from '@reduxjs/toolkit';
import { logOut } from './commonActions';
import CommunitiesServices from '../services/communities';

const INITIAL_STATE = {
  isLoading: true,
  communityLoader: true,
  list: [],
  communityDetails: null,
};

const communitiesSlice = createSlice({
  name: 'communities',
  initialState: INITIAL_STATE,
  reducers: {
    setList: (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    },
    setCommunity: (state, action) => {
      state.communityDetails = action.payload;
      state.communityLoader = false;
    },
  },
  extraReducers: {
    [logOut]: (state, action) => {
      return { ...INITIAL_STATE };
    },
  },
});

export const { setList, setCommunity } = communitiesSlice.actions;

export const fetchCommunityInfo = (token) => async (dispatch) => {
  try {
    const res = await CommunitiesServices.fetchCommunityInfo(token);

    if (res.success) {
      dispatch(setList(res.communities));
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchCommunityInfoById = (comunityId, token) => async (
  dispatch
) => {
  try {
    const res = await CommunitiesServices.fetchCommunityInfoById(
      comunityId,
      token
    );

    if (res.success) {
      dispatch(setCommunity(res.community));
    }
  } catch (error) {
    console.log(error);
  }
};

export default communitiesSlice.reducer;

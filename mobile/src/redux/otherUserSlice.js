import { createSlice } from '@reduxjs/toolkit';
import UserServices from '../services/user';
import { logOut } from './commonActions';

const INITIAL_STATE = {
  isLoading: true,
  data: null,
};

const otherUserSlice = createSlice({
  name: 'otherUser',
  initialState: INITIAL_STATE,
  reducers: {
    setOtherUserData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [logOut]: (state, action) => {
      return { ...INITIAL_STATE };
    },
  },
});

const { setOtherUserData } = otherUserSlice.actions;

export const fetchOtherUserInfo = (userId, token) => async (dispatch) => {
  try {
    const res = await UserServices.fetUserInfo(userId, token);

    if (res.success) {
      dispatch(setOtherUserData(res.user));
    }
  } catch (error) {
    console.log(error);
  }
};

export default otherUserSlice.reducer;

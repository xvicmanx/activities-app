import { createSlice } from '@reduxjs/toolkit';
import UserServices from '../services/user';

const otherUserSlice = createSlice({
  name: 'otherUser',
  initialState: {
    isLoading: true,
    data: null,
  },
  reducers: {
    setOtherUserData: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
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

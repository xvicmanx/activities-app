import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkUserInfo = createAsyncThunk('auth/checkUserInfo', async (arg, thunkAPI) => {
  const token = await AsyncStorage.getItem('userToken');

  if (!token) {
    return null;
  }

  // const res = await AuthService.checkUserInfo(token);

  // if (res.code === 'NOT_AUTHORIZED') {
  //   dispatch(authSlice.actions.setCurrentUser(null));
  //   return;
  // }

  // if (res.success) {
  //   dispatch(
  //     authSlice.actions.setCurrentUser({
  //       exp: res.exp,
  //       token: res.token,
  //       ...res.user,
  //     })
  //   );
  // }
});

export default createSlice({
  name: 'auth',
  initialState: {
    isLoading: true,
    currentUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserInfo.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.currentUser = payload;
      })
      .addCase(checkUserInfo.rejected, (state, { error }) => {
        console.log(error);
      });
  },
});

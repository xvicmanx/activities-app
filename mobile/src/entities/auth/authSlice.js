import { createSlice } from '@reduxjs/toolkit';
import { updateDescription, uploadImage } from '../../common/actions';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

const INITIAL_STATE = {
  currentUser: {
    isLoading: true,
    data: null,
  },
  signin: {
    isLoading: false,
    errors: null,
  },
  specificUser: {
    isLoading: true,
    data: null,
  },
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (error) {
    console.log(error);
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser.data = payload;
      state.currentUser.isLoading = false;
      state.signin.isLoading = false;
      state.signin.errors = null;

      messaging()
        .subscribeToTopic('newActivity')
        .then(() => console.log('subscribeToTopic'));
    },
    setSpecificUser: (state, { payload }) => {
      state.specificUser.isLoading = false;
      state.specificUser.data = payload;
    },
    loginUserStarted: (state, { payload }) => {
      state.signin.isLoading = true;
    },
    setSigninErrors: (state, { payload }) => {
      state.signin.errors = payload;
      state.signin.isLoading = false;
    },
    logOut: (state, { payload }) => {
      messaging()
        .unsubscribeFromTopic('newActivity')
        .then(() => console.log('unsubscribeFromTopic()'));

      removeToken();

      return {
        ...INITIAL_STATE,
        currentUser: {
          ...INITIAL_STATE.currentUser,
          isLoading: false,
        },
      };
    },
  },
  extraReducers: {
    [updateDescription]: (state, action) => {
      state.currentUser.data.description = action.payload;
    },
    [uploadImage]: (state, action) => {
      state.currentUser.data.profileURL = action.payload;
    },
  },
});

export default authSlice;

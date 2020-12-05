import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
// import { checkUserInfo } from './entities/auth/actions';
// import TabBarNavigation from './TabBarNavigation';
import COLORS from '../../constants/colors';
import { checkUserInfo } from './authSliceTemp';

export default () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ auth }) => auth.isLoading);
  const currentUser = useSelector(({ auth }) => auth.currentUser);

  useEffect(() => {
    dispatch(checkUserInfo());
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      {!currentUser ? <SignInScreen /> : null}
    </>
  );
};

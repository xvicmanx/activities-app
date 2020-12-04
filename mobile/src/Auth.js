import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar } from 'react-native';
import SplashScreen from './SplashScreen';
import { SignInScreen } from './entities/auth/screens';
import { checkUserInfo } from './entities/auth/actions';
import TabBarNavigation from './TabBarNavigation';
import { COLORS } from './constants';

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.auth.currentUser);

  useEffect(() => {
    dispatch(checkUserInfo());
  }, []);

  if (currentUser.isLoading) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      {!currentUser.data ? <SignInScreen /> : <TabBarNavigation />}
    </>
  );
};

export default App;

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Splash, SignIn } from './screens';
import { checkUserInfo } from './redux/authSlice';
import { TabBar } from './navigation';
import { StatusBar } from 'react-native';
import { COLORS } from './constants/colors';

const App = () => {
  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkUserInfo());
  }, []);

  if (isLoading) {
    return <Splash />;
  }

  return (
    <>
      <StatusBar backgroundColor={COLORS.primary} />
      {!user ? <SignIn /> : <TabBar />}
    </>
  );
};

export default App;

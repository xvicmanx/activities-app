import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import store from './store';
import Auth from './entities/auth/Auth';

export default () => (
  <Provider store={store}>
    <NavigationContainer>
      <Auth />
    </NavigationContainer>
  </Provider>
);

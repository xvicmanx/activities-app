import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home } from '../screens';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        options={{ title: 'Actividades (0)' }}
        component={Home}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

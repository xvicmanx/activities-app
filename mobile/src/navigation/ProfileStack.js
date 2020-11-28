import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '../screens';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreen"
        options={{ title: 'Perfil' }}
        component={Profile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;

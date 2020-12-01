import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Profile } from '../screens';
import { COLORS } from '../constants';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="ProfileScreen"
        options={{ title: 'Perfil' }}
        component={Profile}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;

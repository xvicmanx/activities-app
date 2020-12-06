import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from './screens/ProfileScreen';
import COLORS from '../../constants/colors';

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
      <Stack.Screen name="ProfileScreen" options={{ title: 'Perfil' }} component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;

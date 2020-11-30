import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, ParticipantesList, OtherUserInfo } from '../screens';
import { COLORS } from '../constants';
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        options={{ title: 'Actividades (0)' }}
        component={Home}
      />
      <Stack.Screen
        name="ParticipantsListScreen"
        options={{ title: 'Participantes' }}
        component={ParticipantesList}
      />
      <Stack.Screen
        options={{ title: '' }}
        name="OtherUserInfoScreen"
        component={OtherUserInfo}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

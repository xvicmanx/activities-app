import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Home, ParticipantesList, OtherUserInfo } from '../screens';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
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
      <Stack.Screen name="OtherUserInfoScreen" component={OtherUserInfo} />
    </Stack.Navigator>
  );
};

export default HomeStack;

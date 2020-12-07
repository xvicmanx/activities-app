import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ParticipantsScreen from './screens/ParticipantsScreen';
import OthersProfile from '../user/screens/OthersProfile';
import COLORS from '../../constants/colors';

const Stack = createStackNavigator();

const ActivitiesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="ActivitiesScreen"
        options={{ title: 'Actividades (0)' }}
        component={ActivitiesScreen}
      />

      <Stack.Screen
        name="ParticipantsScreen"
        options={{ title: 'Participantes' }}
        component={ParticipantsScreen}
      />

      <Stack.Screen options={{ title: '' }} name="OthersProfile" component={OthersProfile} />
    </Stack.Navigator>
  );
};

export default ActivitiesStack;

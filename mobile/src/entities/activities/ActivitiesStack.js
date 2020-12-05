import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ActivitiesScreen from './screens/ActivitiesScreen';
import ParticipantsScreen from './screens/ParticipantsScreen';
// import { SpecificUserScreen } from '../auth/screens';
import COLORS from '../../constants/colors';
const Stack = createStackNavigator();

export default () => (
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
    {/* 
    
    <Stack.Screen
      options={{ title: '' }}
      name="SpecificUserScreen"
      component={SpecificUserScreen}
    /> 
    */}
  </Stack.Navigator>
);

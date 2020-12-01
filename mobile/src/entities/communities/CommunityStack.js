import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CommunitiesScreen, CommunityScreen } from './screens';
import { SpecificUserScreen } from '../auth/screens';
import { COLORS } from '../../constants';

const Stack = createStackNavigator();

const CommunityStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { backgroundColor: COLORS.primary },
        headerTintColor: '#fff',
      }}
    >
      <Stack.Screen
        name="CommunitiesScreen"
        options={{ title: 'Lista de Comunidades' }}
        component={CommunitiesScreen}
      />
      <Stack.Screen
        name="CommunityScreen"
        options={{ title: 'Comunidades' }}
        component={CommunityScreen}
      />

      <Stack.Screen name="SpecificUserScreen" component={SpecificUserScreen} />
    </Stack.Navigator>
  );
};

export default CommunityStack;

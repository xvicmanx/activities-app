import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Community, CommunitiesList } from '../screens';

const Stack = createStackNavigator();

const CommunityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CommunitiesListScreen"
        options={{ title: 'Lista de Comunidades' }}
        component={CommunitiesList}
      />
      <Stack.Screen
        name="CommunityScreen"
        options={{ title: 'Comunidad' }}
        component={Community}
      />
    </Stack.Navigator>
  );
};

export default CommunityStack;

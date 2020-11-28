import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Community } from '../screens';

const Stack = createStackNavigator();

const CommunityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CommunityScreen"
        options={{ title: 'Comunidad' }}
        component={Community}
      />
    </Stack.Navigator>
  );
};

export default CommunityStack;

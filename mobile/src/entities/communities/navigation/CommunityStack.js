import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Community, CommunitiesList, OtherUserInfo } from '../screens';
import { COLORS } from '../constants';
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
        name="CommunitiesListScreen"
        options={{ title: 'Lista de Comunidades' }}
        component={CommunitiesList}
      />
      <Stack.Screen
        name="CommunityScreen"
        options={{ title: 'Comunidad' }}
        component={Community}
      />
      <Stack.Screen name="OtherUserInfoScreen" component={OtherUserInfo} />
    </Stack.Navigator>
  );
};

export default CommunityStack;
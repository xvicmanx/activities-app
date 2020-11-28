import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import CommunityStack from './CommunityStack';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Activities') {
            iconName = focused ? 'ios-apps' : 'ios-apps-outline';
          } else if (route.name === 'Profile') {
            iconName = focused
              ? 'ios-person-circle'
              : 'ios-person-circle-outline';
          } else if (route.name === 'Community') {
            iconName = focused ? 'ios-people' : 'ios-people-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name="Activities"
        options={{ title: 'Actividades' }}
        component={HomeStack}
      />
      <Tab.Screen
        name="Profile"
        options={{ title: 'Perfil' }}
        component={ProfileStack}
      />
      <Tab.Screen
        name="Community"
        options={{ title: 'Comunidad' }}
        component={CommunityStack}
      />
    </Tab.Navigator>
  );
};

export default TabBar;

import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import CommunityStack from './CommunityStack';
import { COLORS } from '../constants';
import { Icon } from 'react-native-elements';

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

          return (
            <Icon type="ionicon" name={iconName} size={27} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 13,
        },
        style: {
          height: 50,
          paddingBottom: 2,
          paddingTop: 3,
        },
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
        options={{ title: 'Comunidades' }}
        component={CommunityStack}
      />
    </Tab.Navigator>
  );
};

export default TabBar;

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { COLORS } from './constants';
import ActivitiesStack from './entities/activities/ActivitiesStack';
import ProfileStack from './entities/user/ProfileStack';
import CommunityStack from './entities/communities/CommunityStack';

const Tab = createBottomTabNavigator();

const TabBarNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'ActivitiesStack') {
            iconName = focused ? 'ios-apps' : 'ios-apps-outline';
          } else if (route.name === 'ProfileStack') {
            iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline';
          } else if (route.name === 'CommunityStack') {
            iconName = focused ? 'ios-people' : 'ios-people-outline';
          }

          return <Icon type="ionicon" name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS.primary,
        inactiveTintColor: 'gray',
        showLabel: false,
      }}
    >
      <Tab.Screen name="ActivitiesStack" component={ActivitiesStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
      <Tab.Screen name="CommunityStack" component={CommunityStack} />
    </Tab.Navigator>
  );
};

export default TabBarNavigation;

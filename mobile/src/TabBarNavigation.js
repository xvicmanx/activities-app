import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import COLORS from './constants/colors';
import ActivitiesStack from './entities/activities/ActivitiesStack';
import ProfileStack from './entities/user/ProfileStack';
// import CommunityStack from './entities/communities/CommunityStack';

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
      }}
      initialRouteName="ProfileStack"
    >
      <Tab.Screen
        name="ActivitiesStack"
        options={{ title: 'Actividades' }}
        component={ActivitiesStack}
      />

      <Tab.Screen name="ProfileStack" options={{ title: 'Perfil' }} component={ProfileStack} />

      {/* 
      <Tab.Screen
        name="CommunityStack"
        options={{ title: 'Comunidades' }}
        component={CommunityStack}
      /> 
      */}
    </Tab.Navigator>
  );
};

export default TabBarNavigation;

import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Image, Spacings, View } from 'react-native-ui-lib';

import { TabScreens } from '@/configs/constants';
import { MovieHome } from '@/containers/movie';
import Watchlist from '@/containers/watchlist/Watchlist';

const ICONS = {
  [TabScreens.Home]: 'home',
  [TabScreens.Message]: 'message',
  [TabScreens.Tweet]: 'tweet',
  [TabScreens.Profile]: 'profile',
  [TabScreens.Movies]: 'home',
  [TabScreens.Watchlist]: 'watchlist'
};

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const { bottom } = useSafeAreaInsets();

  const renderIcon = (route, color, focused) => {
    const name = ICONS[route.name];
    const icon = focused ? `${name}_fill` : name;
    return (
      <View center>
        <Image
          medium
          assetGroup={'tabs'}
          assetName={icon}
          resizeMode={'contain'}
          tintColor={color}
        />
      </View>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, focused }) => renderIcon(route, color, focused),
        tabBarShowLabel: false,
        tabBarInactiveTintColor: Colors.lightGray,
        tabBarActiveTintColor: Colors.subWhite,
        tabBarStyle: {
          height: bottom + 48,
          paddingVertical: Spacings.xs,
          backgroundColor: Colors.subDarkBlue
        },
        tabBarIconStyle: {
          flex: 1,
          width: '100%'
        }
      })}>
      <Tab.Screen name={TabScreens.Movies} component={MovieHome} />
      <Tab.Screen name={TabScreens.Watchlist} component={Watchlist} />
    </Tab.Navigator>
  );
}

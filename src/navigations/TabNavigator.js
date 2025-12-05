import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Image, Spacings, Text, View } from 'react-native-ui-lib';

import { TabScreens } from '@/configs/constants';
import Chat from '@/containers/chat';
import Home from '@/containers/home';
import Profile from '@/containers/profile';
import Tweet from '@/containers/tweet';
import { t } from '@/lang';

const ICONS = {
  [TabScreens.Home]: 'home',
  [TabScreens.Message]: 'message',
  [TabScreens.Tweet]: 'tweet',
  [TabScreens.Profile]: 'profile'
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
        />
        <Text ixText color={color} marginT-vi numberOfLines={1}>
          {t(`tabs.${name}`)}
        </Text>
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
        tabBarActiveTintColor: Colors.primary,
        tabBarStyle: {
          height: bottom + 48,
          paddingVertical: Spacings.xs,
          borderTopColor: Colors.subLightPink,
          borderTopWidth: 1
        },
        tabBarIconStyle: {
          flex: 1,
          width: '100%'
        }
      })}>
      <Tab.Screen name={TabScreens.Home} component={Home} />
      <Tab.Screen name={TabScreens.Message} component={Chat} />
      <Tab.Screen name={TabScreens.Tweet} component={Tweet} />
      <Tab.Screen name={TabScreens.Profile} component={Profile} />
    </Tab.Navigator>
  );
}

import React from 'react';

import { Dimensions, StyleSheet } from 'react-native';
import {
  NavigationState,
  TabView as RNTabView,
  Route,
  SceneRendererProps,
  TabBar,
  TabBarItemProps
} from 'react-native-tab-view';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';

type RouteType = {
  key: string;
  title: string;
};

type Props = {
  renderScene: (
    props: SceneRendererProps & { route: RouteType }
  ) => React.ReactNode;
  swipeDisabled?: boolean;
  scrollEnabled?: boolean;
  onIndexChange: (index: number) => void;
  shadow?: boolean;
  routes: RouteType[];
  widthTabbar?: number;
  showShadow?: boolean;
  index: number;
};

const TabView: React.FC<Props> = ({
  renderScene,
  swipeDisabled = false,
  scrollEnabled = false,
  onIndexChange,
  shadow,
  routes,
  widthTabbar,
  showShadow,
  index
}) => {
  const renderTabBarItem = <T extends Route>({
    route,
    navigationState,
    onPress,
    onLongPress,
    defaultTabWidth,
    activeColor = Colors.primary,
    inactiveColor = Colors.subLightBlack,
    onLayout
  }: TabBarItemProps<T>) => {
    const isFocused =
      navigationState.routes[navigationState.index].key === route.key;

    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        onLayout={onLayout}
        width={defaultTabWidth}
        height={46}
        center>
        <View center>
          <Text
            color={isFocused ? activeColor : inactiveColor}
            bold={isFocused}
            subTitleText>
            {route.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderTabBar = (
    props: SceneRendererProps & { navigationState: NavigationState<RouteType> }
  ) => (
    <View
      paddingH-md
      background-white
      shadow={shadow}
      customStyle={styles.wrapper}>
      <TabBar
        scrollEnabled={scrollEnabled}
        tabStyle={[
          styles.tabStyle,
          widthTabbar ? { width: widthTabbar } : undefined
        ]}
        renderTabBarItem={renderTabBarItem}
        style={styles.tabBar}
        activeColor={Colors.primary}
        inactiveColor={Colors.subLightBlack}
        indicatorStyle={styles.indicator}
        {...props}
      />
    </View>
  );

  return (
    <RNTabView
      initialLayout={{ width: Dimensions.get('window').width }}
      swipeEnabled={!swipeDisabled}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={onIndexChange}
      renderTabBar={renderTabBar}
      style={showShadow ? styles.shadow : undefined}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'white',
    borderBottomColor: Colors.subLightGray,
    borderBottomWidth: 1,
    marginVertical: 0,
    elevation: 0,
    shadowOpacity: 0
  },
  tabStyle: {
    paddingBottom: -5
  },
  indicator: {
    backgroundColor: Colors.primary,
    height: 4,
    marginBottom: -1,
    borderRadius: 2
  },
  wrapper: {
    marginTop: -6
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 1
  }
});

export default TabView;

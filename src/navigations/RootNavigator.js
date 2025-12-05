import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View } from 'react-native-ui-lib';
import { QueryClientProvider } from 'react-query';

import {
  GlobalAlert,
  GlobalImageViewer,
  GlobalLoading,
  NetworkStatus
} from '@/components';
import {
  Screens,
  appAlert,
  appImageViewer,
  appLoading,
  queryClient
} from '@/configs/constants';
import Components from '@/containers/common';
import { useInitApp } from '@/hooks/api';

import Navigator from './Navigator';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  useInitApp();

  const onRef = ref => {
    Navigator.setContainer(ref);
  };

  const getInitialRouteName = () => Screens.TabNavigator;

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <GestureHandlerRootView>
          <View flex>
            <NetworkStatus />
            <NavigationContainer ref={onRef}>
              <Stack.Navigator
                initialRouteName={getInitialRouteName()}
                screenOptions={{
                  headerShown: false
                }}>
                <Stack.Screen
                  name={Screens.Components}
                  component={Components}
                />
                <Stack.Screen
                  name={Screens.TabNavigator}
                  component={TabNavigator}
                />
              </Stack.Navigator>
            </NavigationContainer>
            <GlobalAlert ref={appAlert} />
            <GlobalLoading ref={appLoading} />
            <GlobalImageViewer ref={appImageViewer} />
          </View>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

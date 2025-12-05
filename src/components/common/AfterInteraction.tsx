import React, { useState, useEffect } from 'react';

import {
  ActivityIndicator,
  InteractionManager,
  StyleSheet
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Spacings, View, ViewProps } from 'react-native-ui-lib';

interface AfterInteractionProps extends ViewProps {
  disableAnimation?: boolean;
  children?: React.ReactNode;
  skeleton?: React.ReactNode;
  forceShow?: boolean;
}

const AfterInteraction: React.FC<AfterInteractionProps> = ({
  disableAnimation,
  children,
  skeleton,
  forceShow,
  ...props
}) => {
  const [finished, setFinished] = useState<boolean>(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFinished(true);
    }, 200);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setFinished(true);
    });
  }, []);

  const defaultSkeleton = (): React.ReactElement => (
    <View flex center bg-grey80>
      <ActivityIndicator size={Spacings.lg} color={'rgba(0, 0, 0, .3)'} />
    </View>
  );

  const renderSkeleton = (): React.ReactNode =>
    skeleton || (!disableAnimation && defaultSkeleton());

  return (
    <View flex {...props}>
      {(finished && !forceShow && (
        <Animated.View style={styles.flex} entering={FadeIn.duration(250)}>
          {children}
        </Animated.View>
      )) ||
        renderSkeleton()}
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1
  }
});
export default AfterInteraction;

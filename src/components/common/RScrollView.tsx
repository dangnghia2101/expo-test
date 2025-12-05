import React, { forwardRef, useRef } from 'react';

import { useScrollToTop } from '@react-navigation/native';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  ScrollViewProps
} from 'react-native';
import { Colors } from 'react-native-ui-lib';

import { useRefreshByUser } from 'hooks';

interface RScrollViewProps extends ScrollViewProps {
  refetch?: (() => Promise<any>) | (() => Promise<any>)[];
  enableScrollToTop?: boolean;
}

const RScrollView = forwardRef<ScrollView, RScrollViewProps>(
  ({ refetch, enableScrollToTop = false, ...props }, ref) => {
    const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

    const scrollRef = useRef<ScrollView>(null);
    const emptyScrollRef = useRef<ScrollView>(null);

    useScrollToTop(
      enableScrollToTop ? (ref as any) || scrollRef : emptyScrollRef
    );

    return (
      <ScrollView
        ref={ref || scrollRef}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            onRefresh={refetchByUser}
            tintColor={Colors.grey}
          />
        }
        contentContainerStyle={styles.container}
        {...props}
      />
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1
  }
});

export default RScrollView;

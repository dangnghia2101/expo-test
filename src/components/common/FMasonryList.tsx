import React, {
  forwardRef,
  memo,
  ReactElement,
  RefObject,
  useCallback,
  useRef
} from 'react';

import { useScrollToTop } from '@react-navigation/native';
import {
  MasonryFlashList,
  MasonryFlashListProps,
  MasonryFlashListRef,
  MasonryListRenderItem
} from '@shopify/flash-list';
import isEqual from 'react-fast-compare';
import { ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors, Spacings, View } from 'react-native-ui-lib';

import { useRefreshByUser } from '@/hooks';

import AfterInteraction from './AfterInteraction';
import ListEmpty from './ListEmpty';

export interface FMasonryListProps<T> extends Omit<
  MasonryFlashListProps<T>,
  'data' | 'renderItem'
> {
  keyId?: string;
  useSafeArea?: boolean;
  data: T[];
  refetch?: () => Promise<void>;
  loadMore?: () => void;
  isFetching?: boolean;
  hasNextPage?: boolean;
  isSuccess?: boolean;
  renderItem: MasonryListRenderItem<T>;
  renderEmpty?: ReactElement;
  renderFooter?: ReactElement | (() => ReactElement);
  renderHeader?: ReactElement;
  textEmpty?: string;
  activityIndicatorSize?: number;
  padding?: number;
  paddingH?: number;
  paddingV?: number;
  gap?: number;
}

const FMasonryList = <T extends { [key: string]: any }>(
  {
    keyId = 'id',
    useSafeArea = false,
    data,
    refetch,
    loadMore,
    isFetching,
    hasNextPage,
    isSuccess,
    renderItem,
    renderEmpty,
    renderFooter,
    renderHeader,
    contentContainerStyle,
    textEmpty,
    activityIndicatorSize = 18,
    padding,
    paddingH,
    paddingV,
    estimatedItemSize = 200,
    ...props
  }: FMasonryListProps<T>,
  ref: RefObject<MasonryFlashListRef<T>>
) => {
  const flistRef = useRef<MasonryFlashListRef<T>>(null);
  const flatlistRef = ref || flistRef;
  const { bottom } = useSafeAreaInsets();

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  useScrollToTop(flatlistRef);

  const ListEmptyComponent = useCallback(() => {
    if (renderEmpty) {
      return renderEmpty;
    }

    return <ListEmpty content={textEmpty} />;
  }, [renderEmpty, textEmpty]);

  const ListFooterComponent = useCallback(() => {
    return (
      <>
        {typeof renderFooter === 'function' ? renderFooter() : renderFooter}
        {hasNextPage ? (
          <View paddingV-md>
            <ActivityIndicator
              color={Colors.primary}
              size={activityIndicatorSize}
            />
          </View>
        ) : null}
      </>
    );
  }, [renderFooter, hasNextPage, activityIndicatorSize]);

  return (
    <AfterInteraction
      forceShow={isFetching && !data?.length && !isRefetchingByUser}>
      <MasonryFlashList
        ref={flatlistRef}
        keyExtractor={item => item[keyId]}
        data={data}
        renderItem={renderItem}
        ListEmptyComponent={isSuccess ? ListEmptyComponent : undefined}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        onRefresh={refetchByUser}
        refreshing={isRefetchingByUser}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={{
          ...(useSafeArea ? { paddingBottom: bottom + Spacings.md } : {}),
          padding,
          paddingHorizontal: paddingH,
          paddingVertical: paddingV,
          ...contentContainerStyle
        }}
        estimatedItemSize={estimatedItemSize}
        {...props}
      />
    </AfterInteraction>
  );
};

export default memo(forwardRef(FMasonryList), isEqual);

import React from 'react';

import { Text } from 'react-native-ui-lib';

import { Header, Wrapper } from '@/components';
import { t } from '@/lang';

interface WatchlistProps {
  navigation: any;
}

const Watchlist: React.FC<WatchlistProps> = () => {
  return (
    <Wrapper>
      <Header title={t('watchlist.my_watchlist')} />
      <Text>{t('watchlist.watchlist')}</Text>
    </Wrapper>
  );
};

export default Watchlist;

import React from 'react';

import { Text, View } from 'react-native-ui-lib';

import { Header, Wrapper } from '@/components';

const Tweet = () => {
  return (
    <Wrapper>
      <Header title="Tweet" />
      <View flex center>
        <Text>Tweet Screen</Text>
      </View>
    </Wrapper>
  );
};

export default Tweet;

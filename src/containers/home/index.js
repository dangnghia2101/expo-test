import React from 'react';

import { Text, View } from 'react-native-ui-lib';

import { Header, Wrapper } from '@/components';

const Home = () => {
  return (
    <Wrapper>
      <Header title="Home" />
      <View flex center>
        <Text size={20}>Home Screen</Text>
      </View>
    </Wrapper>
  );
};

export default Home;

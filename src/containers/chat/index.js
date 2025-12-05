import React from 'react';

import { Text, View } from 'react-native-ui-lib';

import { Header, Wrapper } from '@/components';

const Chat = () => {
  return (
    <Wrapper>
      <Header title="Message" />
      <View flex center>
        <Text>Message Screen</Text>
      </View>
    </Wrapper>
  );
};

export default Chat;

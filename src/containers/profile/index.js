import React from 'react';

import { Text, View } from 'react-native-ui-lib';

import { Header, Wrapper } from '@/components';

const Profile = () => {
  return (
    <Wrapper>
      <Header title="Profile" />
      <View flex center>
        <Text>Profile Screen</Text>
      </View>
    </Wrapper>
  );
};

export default Profile;

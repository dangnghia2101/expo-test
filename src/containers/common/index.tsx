import React from 'react';

import { ScrollView } from 'react-native';
import {
  View,
  Text,
  Typography,
  Colors,
  Spacings,
  Image,
  TouchableOpacity,
  Assets
} from 'react-native-ui-lib';

import { BottomWrapper, Button, Wrapper } from '@/components';

const Components = () => {
  const a = Typography.text;
  const b = Colors.lightGray;
  const c = Spacings.i;
  const d = Assets.auth.welcome;

  return (
    <Wrapper>
      <ScrollView>
        <View paddingH-md gap-md bg-primary>
          <Text xiiiText primary>
            {'Components'}
          </Text>
          <View medium bg-primary />
          <TouchableOpacity medium bg-primary marginB-iii>
            <Text>{'Components'}</Text>
          </TouchableOpacity>
          <View marginTop={200}>{}</View>
          <Image medium />
          <Button label="Submit" />
          <Button label="Submit" />
        </View>
        <BottomWrapper />
      </ScrollView>
    </Wrapper>
  );
};

export default Components;

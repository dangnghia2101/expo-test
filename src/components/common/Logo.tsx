import { Image, View, ViewProps } from 'react-native-ui-lib';

const Logo = (props: ViewProps) => {
  return (
    <View center {...props}>
      <Image
        size={57}
        assetName="logo"
        assetGroup="icons"
        aspectRatio={80 / 57}
      />
    </View>
  );
};

export default Logo;

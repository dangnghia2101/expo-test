import { LayoutAnimation } from 'react-native';

export const layoutConfig = (duration: number = 300) => {
  LayoutAnimation.configureNext({
    ...LayoutAnimation.Presets.linear,
    duration
  });
};

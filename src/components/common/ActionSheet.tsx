import React from 'react';

import { ActionSheet as RNActionSheet } from 'react-native-ui-lib';

import { t } from 'lang';

type ActionSheetProps = React.ComponentProps<typeof RNActionSheet>;

const ActionSheet = ({ options, ...props }: ActionSheetProps) => {
  return (
    <RNActionSheet
      useNativeIOS
      cancelButtonIndex={options?.length}
      options={[...(options || []), { label: t('common.cancel') }]}
      {...props}
    />
  );
};

export default ActionSheet;

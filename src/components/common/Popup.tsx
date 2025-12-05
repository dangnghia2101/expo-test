import React, { FC, ReactNode, useRef } from 'react';

import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import Modal from 'react-native-modal';
import { Colors, Spacings, Text, View } from 'react-native-ui-lib';

import { t } from 'lang';

import Button from './Button';

interface PopupProps {
  visible: boolean;
  onDismiss?: () => void;
  onDialogDismissed?: () => void;
  title?: string;
  content?: string;
  children?: (handleConfirm: () => void) => ReactNode;
  labelButton?: string;
  onPress?: () => void;
  labelCancel?: string;
  onCancel?: () => void;
  bgColor?: string;
  customButton?: (handleConfirm: () => void) => ReactNode;
  onConfirmDismiss?: () => void;
  renderContent?: ReactNode;
  preventConfirm?: boolean;
  buttonCancel?: (handleCancel: () => void) => ReactNode;
  buttonConfirm?: (handleConfirm: () => void) => ReactNode;
  textStyleButtonConfirm?: TextStyle;
  isCenterContent?: boolean;
  vertical?: boolean;
  bgButtonConfirm?: string;
  textColorButtonConfirm?: string;
  styleChildren?: StyleProp<ViewStyle>;
  [key: string]: any;
}

const Popup: FC<PopupProps> = ({
  visible = false,
  onDismiss,
  onDialogDismissed,
  title,
  content,
  children,
  labelButton,
  onPress,
  labelCancel = t('common.cancel'),
  onCancel,
  bgColor = Colors.white,
  customButton,
  onConfirmDismiss,
  renderContent,
  preventConfirm,
  buttonCancel,
  buttonConfirm,
  textStyleButtonConfirm,
  isCenterContent = false,
  vertical = false,
  bgButtonConfirm,
  textColorButtonConfirm,
  styleChildren,
  ...props
}) => {
  const isConfirm = useRef<boolean>(false);

  const onHide = (): void => {
    isConfirm.current = false;
    onDismiss?.();
  };

  const handleCancel = (): void => {
    onCancel?.();
    onHide?.();
  };

  const handleConfirm = (): void => {
    if (!preventConfirm) {
      isConfirm.current = true;
      onPress?.();
      onDismiss?.();
    }
  };

  const onModalHide = (): void => {
    onDialogDismissed?.();
    if (isConfirm.current) {
      onConfirmDismiss?.();
    }
  };

  const renderCancel = (): ReactNode => {
    return (
      buttonCancel?.(handleCancel) || (
        <Button outline label={labelCancel} onPress={handleCancel} />
      )
    );
  };

  const renderConfirm = (): ReactNode => {
    return (
      buttonConfirm?.(handleConfirm) || (
        <Button
          label={labelButton}
          onPress={handleConfirm}
          bgColor={bgButtonConfirm}
          textColor={textColorButtonConfirm}
          textStyle={textStyleButtonConfirm}
        />
      )
    );
  };

  return (
    <Modal
      isVisible={visible}
      onDismiss={onHide}
      onModalHide={onModalHide}
      useNativeDriver
      hideModalContentWhileAnimating
      onBackButtonPress={onHide}
      onBackdropPress={onHide}
      avoidKeyboard
      {...props}>
      {children?.(handleConfirm) || (
        <View
          backgroundColor={bgColor}
          radius={Spacings.xs}
          padding-xx
          customStyle={styleChildren}>
          {renderContent}
          {!!title && (
            <View marginB-sm center>
              <Text titleText bold center>
                {title}
              </Text>
            </View>
          )}
          {!!content && (
            <View marginB-xx center>
              <Text bodyText center={isCenterContent}>
                {content}
              </Text>
            </View>
          )}
          {customButton?.(handleConfirm) || (
            <View row={!vertical}>
              {vertical && <View marginB-sm>{renderConfirm()}</View>}
              <View flex={!vertical} marginR-xs={!vertical}>
                {renderCancel()}
              </View>
              {!vertical && (
                <View flex marginL-xs>
                  {renderConfirm()}
                </View>
              )}
            </View>
          )}
        </View>
      )}
    </Modal>
  );
};

export default Popup;

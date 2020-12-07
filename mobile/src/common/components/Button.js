import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button as ButtonRNE } from 'react-native-elements';
import COLORS from '../../constants/colors';

const Button = ({ onPress, style, icon, danger, small, children, loading }) => {
  const smallStyles = small && styles.small;
  const dangerStyles = danger && styles.danger;

  return (
    <ButtonRNE
      title={children}
      loading={loading}
      buttonStyle={{
        backgroundColor: COLORS.primary,
        height: 50,
        ...smallStyles,
        ...dangerStyles,
        ...style,
      }}
      icon={icon && <View style={styles.iconContainer}>{icon}</View>}
      iconRight
      onPress={onPress}
    />
  );
};

const styles = StyleSheet.create({
  small: {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    height: 35,
  },
  danger: {
    backgroundColor: COLORS.danger,
  },
  iconContainer: {
    marginLeft: 10,
  },
});

export default Button;

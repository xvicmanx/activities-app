import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button as ButtonRNE } from 'react-native-elements';
import { COLORS } from '../constants/colors';

const Button = ({ icon, danger, small, children, loading, ...rest }) => {
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
      }}
      icon={icon && <View style={styles.iconContainer}>{icon}</View>}
      iconRight
      {...rest}
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

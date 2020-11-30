import React from 'react';
import { View } from 'react-native';
import { Button as ButtonRNE } from 'react-native-elements';
import { COLORS } from '../constants/colors';

const Button = ({ icon, danger, small, children, loading, ...rest }) => {
  const smallStyles = small && {
    alignSelf: 'flex-start',
    paddingHorizontal: 20,
    height: 35,
  };

  const dangerStyles = danger && {
    backgroundColor: '#e74c3c',
  };

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
      icon={icon && <View style={{ marginLeft: 10 }}>{icon}</View>}
      iconRight
      {...rest}
    />
  );
};

export default Button;

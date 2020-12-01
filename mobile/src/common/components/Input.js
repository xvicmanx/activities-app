import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { Input as InputRNE } from 'react-native-elements';
import { COLORS } from '../../constants';

const Input = forwardRef((props, ref) => {
  const { iconName, error, onChange, disable, ...rest } = props;

  return (
    <InputRNE
      leftIcon={{ type: 'ionicon', name: iconName, color: COLORS.primary }}
      errorStyle={styles.errorStyle}
      errorMessage={error}
      onChangeText={onChange}
      editable={!disable}
      inputStyle={styles.inputStyle}
      ref={ref}
      {...rest}
    />
  );
});

const styles = StyleSheet.create({
  errorStyle: {
    color: COLORS.danger,
  },
  inputStyle: {
    color: COLORS.primary,
    fontSize: 15,
  },
});

export default Input;

import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { Input as InputRNE } from 'react-native-elements';
import { COLORS } from '../../constants';

const Input = forwardRef((props, ref) => {
  const { iconName, error, onChange, disable, ...rest } = props;

  return (
    <InputRNE
      leftIcon={{ type: 'ionicon', name: iconName, color: COLORS.primary }}
      errorStyle={styles.error}
      errorMessage={error}
      onChangeText={onChange}
      editable={!disable}
      inputStyle={styles.input}
      inputContainerStyle={error && styles.inputContainerError}
      ref={ref}
      {...rest}
    />
  );
});

const styles = StyleSheet.create({
  error: {
    color: COLORS.danger,
  },
  success: {
    color: COLORS.green,
  },
  input: {
    color: COLORS.primary,
    fontSize: 15,
  },
  inputContainerError: {
    borderColor: COLORS.danger,
  },
});

export default Input;

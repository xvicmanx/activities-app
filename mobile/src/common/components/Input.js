import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { COLORS } from '../../constants';

export default forwardRef(
  ({ value, iconName, error, onChange, disabled, secureTextEntry }, ref) => {
    return (
      <Input
        value={value}
        leftIcon={{ type: 'ionicon', name: iconName, color: COLORS.primary }}
        errorStyle={styles.error}
        errorMessage={error}
        onChangeText={onChange}
        editable={!disabled}
        inputStyle={styles.input}
        inputContainerStyle={error && styles.inputContainerError}
        secureTextEntry={secureTextEntry}
        ref={ref}
      />
    );
  }
);

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

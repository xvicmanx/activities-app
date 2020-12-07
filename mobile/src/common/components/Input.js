import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native';
import { Input as InputRNE } from 'react-native-elements';
import COLORS from '../../constants/colors';

const Input = forwardRef(
  (
    {
      blurOnSubmit,
      onSubmitEditing,
      returnKeyType,
      value,
      iconName,
      error,
      onChange,
      disabled,
      secureTextEntry,
      placeholder,
    },
    ref
  ) => (
    <InputRNE
      value={value}
      leftIcon={{ type: 'ionicon', name: iconName, color: COLORS.primary }}
      errorStyle={styles.error}
      errorMessage={error}
      onChangeText={onChange}
      editable={!disabled}
      inputStyle={styles.input}
      inputContainerStyle={error && styles.inputContainerError}
      secureTextEntry={secureTextEntry}
      returnKeyType={returnKeyType}
      onSubmitEditing={onSubmitEditing}
      blurOnSubmit={blurOnSubmit}
      placeholder={placeholder}
      ref={ref}
    />
  )
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

export default Input;

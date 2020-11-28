import React, { forwardRef } from 'react';
import { Text, StyleSheet, TextInput } from 'react-native';

const Input = forwardRef(({ error, onChange, disable, ...rest }, ref) => {
  return (
    <>
      <TextInput
        editable={!disable}
        style={styles.input}
        onChangeText={onChange}
        {...rest}
        ref={ref}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
  },
  errorText: {
    marginTop: 6,
    color: 'red',
  },
});

export default Input;

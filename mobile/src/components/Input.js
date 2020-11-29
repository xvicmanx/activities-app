import React, { forwardRef } from 'react';
import { Input as InputRNE } from 'react-native-elements';

const Input = forwardRef((props, ref) => {
  const { iconName, error, onChange, disable, ...rest } = props;

  return (
    <InputRNE
      leftIcon={{ type: 'ionicon', name: iconName }}
      errorStyle={{ color: 'red' }}
      errorMessage={error}
      onChangeText={onChange}
      editable={!disable}
      ref={ref}
      {...rest}
    />
  );
});

export default Input;

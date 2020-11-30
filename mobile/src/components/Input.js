import React, { forwardRef } from 'react';
import { Input as InputRNE } from 'react-native-elements';
import { COLORS } from '../constants';

const Input = forwardRef((props, ref) => {
  const { iconName, error, onChange, disable, ...rest } = props;

  return (
    <InputRNE
      leftIcon={{ type: 'ionicon', name: iconName, color: COLORS.primary }}
      errorStyle={{ color: COLORS.danger }}
      errorMessage={error}
      onChangeText={onChange}
      editable={!disable}
      inputStyle={{ color: COLORS.primary, fontSize: 15 }}
      ref={ref}
      {...rest}
    />
  );
});

export default Input;

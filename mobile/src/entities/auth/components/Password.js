import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../common/components/Input';
import loginFormSlice from '../loginFormSlice';

export default ({ passwordRef }) => {
  const dispatch = useDispatch();
  const value = useSelector(({ loginForm }) => loginForm.password.value);
  const error = useSelector(({ loginForm }) => loginForm.password.error);
  const isLoading = useSelector(({ loginForm }) => loginForm.isLoading);

  const onChange = (name, value) => {
    dispatch(
      loginFormSlice.actions.onChange({
        name,
        value,
      })
    );
  };

  return (
    <Input
      error={error}
      value={value}
      onChange={onChange.bind(this, 'password')}
      secureTextEntry
      disabled={isLoading}
      placeholder="Contraseña..."
      ref={passwordRef}
      iconName="lock-closed-outline"
    />
  );
};

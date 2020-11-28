import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ERRORS } from '../constants/errors';
import {
  fetchUsers,
  setUserSelected,
  loginUser,
  setError,
} from '../redux/signinSlice';
import { UsersPicker, Input, Button } from '../components';

const SignIn = () => {
  const dispatch = useDispatch();
  const { isLoading, users, userSelected, loginLoader, error } = useSelector(
    (state) => state.signin
  );

  const [password, setPassword] = useState('123456');
  const [passwordError, setPasswordError] = useState(null);

  const onPickerChange = (user) => {
    dispatch(setUserSelected(user));
  };

  const onPasswordChange = (value) => {
    if (passwordError) {
      setPasswordError(null);
    }
    if (error) {
      dispatch(setError(null));
    }

    setPassword(value);
  };

  const signin = () => {
    if (password.length < 6) {
      setPasswordError(ERRORS.password.incorrect);
      return;
    }

    dispatch(loginUser(userSelected.email, password));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesion</Text>
      <UsersPicker
        disabled={loginLoader}
        data={users}
        value={userSelected}
        onChage={onPickerChange}
      />
      <View style={styles.lineBreak} />
      <Input
        error={passwordError || error}
        value={password}
        onChange={onPasswordChange}
        secureTextEntry
        disable={loginLoader}
      />

      <View style={styles.lineBreak} />
      <Button loading={loginLoader} onPress={signin}>
        Entrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 20,
  },
  lineBreak: {
    height: 15,
  },
});

export default SignIn;

import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ERRORS } from '../constants/errors';
import { loginUser, setError } from '../redux/signinSlice';
import { Input, Button } from '../components';

const SignIn = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.signin);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);
  const passwordRef = useRef();

  const onEmailChange = (value) => {
    setEmail(value);

    if (emailError) {
      setEmailError(null);
    }
  };

  const onPasswordChange = (value) => {
    setPassword(value);

    if (passwordError) {
      setPasswordError(null);
    }

    if (error) {
      dispatch(setError(null));
    }
  };

  const signin = () => {
    const validEmailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    if (!email.match(validEmailRegExp)) {
      setEmailError(ERRORS.emailFormat);
      return;
    }

    if (password.length < 6) {
      setPasswordError(ERRORS.password.lessThanSixCharacters);
      return;
    }

    dispatch(loginUser(email, password));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesion</Text>

      <Input
        error={emailError}
        value={email}
        onChange={onEmailChange}
        disable={isLoading}
        placeholder="Email..."
        returnKeyType="next"
        onSubmitEditing={() => {
          passwordRef.current.focus();
        }}
        blurOnSubmit={false}
      />

      <View style={styles.lineBreak} />

      <Input
        error={passwordError || error}
        value={password}
        onChange={onPasswordChange}
        secureTextEntry
        disable={isLoading}
        placeholder="Contraseña..."
        ref={passwordRef}
      />

      <View style={styles.lineBreak} />

      <Button loading={isLoading} onPress={signin}>
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

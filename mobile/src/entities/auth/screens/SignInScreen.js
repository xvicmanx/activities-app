import React, { useRef, useReducer } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from 'react-native-elements';
import { COLORS, ERRORS, RegExpValidation } from '../../../constants';
import { Input, Button } from '../../../common/components';
import {
  initialState,
  reducer,
  HANDLE_CHANGE,
  SET_ERRORS,
} from './SignInScreenReducer';
import { loginUser } from '../actions';

const SignIn = () => {
  const reduxDispatch = useDispatch();
  const { isLoading, errors } = useSelector((s) => s.auth.signin);
  const [state, dispatch] = useReducer(reducer, initialState);
  const passwordRef = useRef();

  const onChange = (name, value) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const signin = () => {
    if (!state.email.match(RegExpValidation.email)) {
      dispatch({
        type: SET_ERRORS,
        payload: { name: 'email', value: ERRORS.emailFormat },
      });

      return;
    }

    if (state.password.length < 6) {
      dispatch({
        type: SET_ERRORS,
        payload: {
          name: 'password',
          value: ERRORS.password.lessThanSixCharacters,
        },
      });

      return;
    }

    reduxDispatch(loginUser(state.email, state.password));
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/logo.png')}
        resizeMode="contain"
      />

      <Text style={styles.title} h3>
        Iniciar Sesion
      </Text>

      <Input
        error={state.errors.email}
        value={state.email}
        onChange={onChange.bind(this, 'email')}
        disable={isLoading}
        placeholder="Email..."
        returnKeyType="next"
        onSubmitEditing={() => {
          passwordRef.current.focus();
        }}
        blurOnSubmit={false}
        iconName="mail-outline"
      />

      <View style={styles.lineBreak} />

      <Input
        error={state.errors.password || errors}
        value={state.password}
        onChange={onChange.bind(this, 'password')}
        secureTextEntry
        disable={isLoading}
        placeholder="Contraseña..."
        ref={passwordRef}
        iconName="lock-closed-outline"
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
  logo: {
    width: 130,
    height: 130,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 25,
    color: COLORS.dark,
  },
  lineBreak: {
    height: 15,
  },
});

export default SignIn;

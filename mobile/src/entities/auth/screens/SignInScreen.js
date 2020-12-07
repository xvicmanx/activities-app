import React, { useRef } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import logoImage from '../../../assets/images/logo.png';
import Email from '../components/Email';
import Password from '../components/Password';
import Button from '../../../common/components/Button';
import { loginUser } from '../actions';
import COLORS from '../../../constants/colors';

const SignInScreen = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ loginForm }) => loginForm.isLoading);
  const network = useSelector(({ auth }) => auth.network);
  const passwordRef = useRef();

  const signin = () => {
    dispatch(loginUser());
  };

  return (
    <View style={styles.container}>
      {network.error && <Text style={styles.networkError}>{network.message}</Text>}
      <Image style={styles.logo} source={logoImage} resizeMode="contain" />

      <View style={styles.fieldsContainer}>
        <Email passwordRef={passwordRef} />
        <Password passwordRef={passwordRef} />
      </View>

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
    padding: 25,
  },
  logo: {
    width: 130,
    height: 130,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  lineBreak: {
    height: 15,
  },
  fieldsContainer: {
    marginBottom: 15,
  },
  networkError: {
    color: '#fff',
    backgroundColor: COLORS.danger,
    textAlign: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 20,
    width: 250,
  },
});

export default SignInScreen;

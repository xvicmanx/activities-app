import React, { useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import logoImage from '../../../assets/images/logo.png';
import Email from '../components/Email';
import Password from '../components/Password';
import Button from '../../../common/components/Button';
import { loginUser } from '../loginFormSlice';

export default () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ loginForm }) => loginForm.isLoading);
  const passwordRef = useRef();

  const signin = () => {
    dispatch(loginUser());
  };

  return (
    <View style={styles.container}>
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
});

import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Input from '../../../common/components/Input';
import Button from '../../../common/components/Button';
import COLORS from '../../../constants/colors';
import { onChange, updatePassword } from '../actions';
import { useNavigation } from '@react-navigation/native';

const ChangePassword = () => {
  const { setOptions } = useNavigation();
  const [tabBarVisible, setTabBarVisible] = useState(true);
  const dispatch = useDispatch();
  const newPasswordRef = useRef();
  const repeatPasswordRef = useRef();
  const previousPassword = useSelector(
    ({ changePasswordForm }) => changePasswordForm.previousPassword
  );
  const confirmPassword = useSelector(
    ({ changePasswordForm }) => changePasswordForm.confirmPassword
  );
  const password = useSelector(({ changePasswordForm }) => changePasswordForm.password);
  const isLoading = useSelector(({ changePasswordForm }) => changePasswordForm.isLoading);
  const message = useSelector(({ changePasswordForm }) => changePasswordForm.message);

  const handleOnChange = (name, value) => {
    dispatch(onChange({ name, value }));
  };

  const submit = () => {
    dispatch(updatePassword());
  };

  const keyboardDidShow = () => {
    console.warn('OK');
  };
  const keyboardDidHide = () => {
    console.warn('Se fue');
  };

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', keyboardDidHide);

    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide);
    };
  }, []);

  useEffect(() => {
    setOptions({ tabBarVisible: false });
  }, [tabBarVisible]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Cambiar Contraseña</Text>

      <Input
        value={previousPassword.value}
        onChange={handleOnChange.bind(this, 'previousPassword')}
        placeholder="Escribre la contraseña actual..."
        secureTextEntry
        returnKeyType="next"
        onSubmitEditing={() => {
          newPasswordRef.current.focus();
        }}
        blurOnSubmit={false}
        error={previousPassword.error}
      />

      <Input
        value={password.value}
        onChange={handleOnChange.bind(this, 'password')}
        placeholder="Escribre la nueva contraseña..."
        secureTextEntry
        returnKeyType="next"
        onSubmitEditing={() => {
          repeatPasswordRef.current.focus();
        }}
        blurOnSubmit={false}
        ref={newPasswordRef}
        error={password.error}
      />

      <Input
        value={confirmPassword.value}
        onChange={handleOnChange.bind(this, 'confirmPassword')}
        placeholder="Repite la nueva contraseña..."
        secureTextEntry
        ref={repeatPasswordRef}
        error={confirmPassword.error}
      />

      {message.value && (
        <Text
          style={{ color: message.error ? COLORS.danger : COLORS.success, alignSelf: 'center' }}
        >
          {message.value}
        </Text>
      )}

      <View style={styles.lineBreak} />

      <Button loading={isLoading} onPress={submit} small>
        Cambiar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.dark,
    alignSelf: 'center',
  },
  lineBreak: {
    height: 15,
  },
});

export default ChangePassword;

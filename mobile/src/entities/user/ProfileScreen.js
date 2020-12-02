import React, { useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Avatar, Button, Input } from '../../common/components';
import { COLORS } from '../../constants';
import authSlice from '../auth/authSlice';
import { updatePassword } from './actions';
import userSlice from './userSlice';
import validator from './validator';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.auth.currentUser);
  const state = useSelector((s) => s.user);
  const repeatPasswordRef = useRef();
  const newPasswordRef = useRef();

  const onChange = (name, value) => {
    dispatch(
      userSlice.actions.handleChange({
        name,
        value,
      })
    );
  };

  const editDescription = () => {};
  const editPassword = () => {
    dispatch(userSlice.actions.setIsEditing());
  };

  const submit = () => {
    const { isValid, errors } = validator(state);

    if (!isValid) {
      dispatch(userSlice.actions.setErrors(errors));
      return;
    }

    const passwordsData = {
      previousPassword: state.previousPassword,
      password: state.password,
      confirmPassword: state.confirmPassword,
    };

    dispatch(updatePassword(passwordsData, currentUser.data.token));
  };

  const closeSession = () => {
    dispatch(authSlice.actions.logOut());
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar size={75} img={currentUser.data.profileURL} />
        <Text style={styles.name}>{currentUser.data.name}</Text>
      </View>

      <Text style={styles.description}>{currentUser.data.description}</Text>

      <Button
        icon={
          <Icon type="simple-line-icon" name="pencil" size={15} color="white" />
        }
        onPress={editDescription}
      >
        Editar Descripcion
      </Button>
      <View style={styles.lineBreak} />

      <Button onPress={editPassword}>Cambiar Contraseña</Button>
      <View style={styles.lineBreak} />

      {state.isEditing && (
        <View style={styles.inputsContainer}>
          <Text style={styles.label}>Cambiar Contraseña</Text>

          <Input
            value={state.previousPassword}
            onChange={onChange.bind(this, 'previousPassword')}
            placeholder="Escribre la contraseña actual..."
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => {
              newPasswordRef.current.focus();
            }}
            blurOnSubmit={false}
            error={state.errors.previousPassword}
          />

          <View style={styles.lineBreak} />

          <Input
            value={state.password}
            onChange={onChange.bind(this, 'password')}
            placeholder="Escribre la nueva contraseña..."
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => {
              repeatPasswordRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={newPasswordRef}
            error={
              state.errors.password || (state.errors.confirmPassword && ' ')
            }
          />

          <View style={styles.lineBreak} />

          <Input
            value={state.confirmPassword}
            onChange={onChange.bind(this, 'confirmPassword')}
            placeholder="Repite la nueva contraseña..."
            secureTextEntry
            ref={repeatPasswordRef}
            error={state.errors.confirmPassword}
          />

          <View style={styles.lineBreak} />
          {state.message.visibility && (
            <>
              <Text
                style={[
                  styles.meesage,
                  {
                    color: state.message.success ? COLORS.green : COLORS.danger,
                  },
                ]}
              >
                {state.message.text}
              </Text>
              <View style={styles.lineBreak} />
            </>
          )}

          <View style={styles.lineBreak} />

          <Button loading={state.isLoading} onPress={submit} small>
            Cambiar
          </Button>
        </View>
      )}

      <Button onPress={closeSession} danger>
        Cerrar Sesion
      </Button>

      <View style={styles.scrollBottomHeight} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  inputsContainer: {
    paddingTop: 50,
    marginBottom: 50,
  },
  name: {
    fontSize: 18,
    marginTop: 5,
    fontWeight: 'bold',
    color: COLORS.dark,
  },
  description: {
    fontSize: 20,
    marginBottom: 40,
    color: COLORS.text,
  },
  lineBreak: {
    height: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: COLORS.dark,
  },
  scrollBottomHeight: {
    height: 100,
  },
  meesage: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default ProfileScreen;

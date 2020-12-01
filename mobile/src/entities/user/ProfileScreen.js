import React, { useReducer, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Avatar, Button, Input } from '../../common/components';
import { COLORS } from '../../constants';
import {
  initialState,
  reducer,
  HANDLE_CHANGE,
  EDIT_PASSWORD,
} from './ProfileScreenReducer';
import authSlice from '../auth/authSlice';

const ProfileScreen = () => {
  const reduxDispatch = useDispatch();
  const currentUser = useSelector((s) => s.auth.currentUser);
  const [state, dispatch] = useReducer(reducer, initialState);
  const repeatPasswordRef = useRef();
  const newPasswordRef = useRef();

  const onChange = (name, value) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

  const editDescription = () => {
    //TODO
  };

  const editPassword = () => {
    dispatch({ type: EDIT_PASSWORD });
  };

  const changePassword = () => {
    console.warn('OK');
    //TODO
  };

  const closeSession = () => {
    reduxDispatch(authSlice.actions.logOut());
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
            value={state.currentPassword}
            onChange={onChange.bind(this, 'currentPassword')}
            placeholder="Escribre la contraseña actual..."
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => {
              newPasswordRef.current.focus();
            }}
            blurOnSubmit={false}
          />

          <View style={styles.lineBreak} />

          <Input
            value={state.nextPassword}
            onChange={onChange.bind(this, 'nextPassword')}
            placeholder="Escribre la nueva contraseña..."
            secureTextEntry
            returnKeyType="next"
            onSubmitEditing={() => {
              repeatPasswordRef.current.focus();
            }}
            blurOnSubmit={false}
            ref={newPasswordRef}
          />

          <View style={styles.lineBreak} />

          <Input
            value={state.confirmNextPassword}
            onChange={onChange.bind(this, 'confirmNextPassword')}
            placeholder="Repite la nueva contraseña..."
            secureTextEntry
            ref={repeatPasswordRef}
            // error={passwordError}
          />

          <View style={styles.lineBreak} />

          <Button onPress={changePassword} small>
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
});

export default ProfileScreen;

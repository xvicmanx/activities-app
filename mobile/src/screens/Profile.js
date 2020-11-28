import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar, Button, Input } from '../components';
import { ERRORS } from '../constants/errors';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [passwordError, setPasswordError] = useState(null);

  const repeatPasswordRef = useRef();
  const newPasswordRef = useRef();

  const [isEditing, setIsEdting] = useState(false);

  const onCurrentPasswordChange = (value) => {
    setCurrentPassword(value);
  };
  const onPasswordChange = (value) => {
    setPassword(value);
  };
  const onRepeatPasswordChange = (value) => {
    setRepeatPassword(value);
  };

  const editDescription = () => {};

  const editPassword = () => {
    setIsEdting(true);
  };

  const changePassword = () => {
    //
  };

  const closeSession = () => {};

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Avatar size={75} img={user.profileURL} />
        <Text style={styles.name}>{user.name}</Text>
      </View>

      <Text style={styles.description}>{user.description}</Text>

      <View style={styles.bottonsContainer}>
        <Button onPress={editDescription} small>
          Editar Descripcion
        </Button>

        <Button onPress={editPassword} small>
          Cambiar Contraseña
        </Button>
      </View>

      <View style={styles.lineBreak} />

      {isEditing && (
        <View style={{ marginBottom: 50 }}>
          <Text style={styles.label}>Cambiar Contraseña</Text>

          <Input
            value={currentPassword}
            onChange={onCurrentPasswordChange}
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
            value={password}
            onChange={onPasswordChange}
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
            value={repeatPassword}
            onChange={onRepeatPasswordChange}
            placeholder="Repite la nueva contraseña..."
            secureTextEntry
            ref={repeatPasswordRef}
            error={passwordError}
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

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  name: {
    fontSize: 18,
    marginTop: 5,
  },
  description: {
    fontSize: 20,
    marginBottom: 40,
  },
  lineBreak: {
    height: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  bottonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default Profile;

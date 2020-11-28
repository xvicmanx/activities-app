import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import { Avatar, Button, Input } from '../components';

const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const repeatPasswordRef = useRef();

  const onPasswordChange = (value) => {
    setPassword(value);
  };
  const onRepeatPasswordChange = (value) => {
    setRepeatPassword(value);
  };

  const editDescription = () => {};
  const changePassword = () => {};
  const closeSession = () => {};

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Avatar size={75} />
        <Text style={styles.name}>{user.name}</Text>
      </View>

      <Text style={styles.description}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.{'\n\n'}Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Text>

      <Button onPress={editDescription} small>
        Editar Descripcion
      </Button>

      <View style={styles.lineBreak} />

      <View style={{ marginBottom: 50 }}>
        <Text style={styles.label}>Cambiar Contraseña</Text>

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
        />

        <View style={styles.lineBreak} />

        <Input
          value={repeatPassword}
          onChange={onRepeatPasswordChange}
          placeholder="Repite la contraseña..."
          secureTextEntry
          ref={repeatPasswordRef}
          error={false}
        />

        <View style={styles.lineBreak} />

        <Button onPress={changePassword} small>
          Cambiar
        </Button>
      </View>

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
    marginBottom: 20,
  },
  lineBreak: {
    height: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default Profile;

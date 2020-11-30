import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Avatar, Button, Input } from '../components';
import { Icon } from 'react-native-elements';
import { COLORS } from '../constants';
import { logOut } from '../redux/commonActions';

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
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

  const editDescription = () => {
    //TODO
  };

  const editPassword = () => {
    setIsEdting(true);
  };

  const changePassword = () => {
    //TODO
  };

  const closeSession = () => {
    dispatch(logOut());
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar size={75} img={user.profileURL} />
        <Text style={styles.name}>{user.name}</Text>
      </View>

      <Text style={styles.description}>{user.description}</Text>

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

      {isEditing && (
        <View style={styles.inputsContainer}>
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

export default Profile;

import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Text } from 'react-native-elements';
import Button from '../../../common/components/Button';
import COLORS from '../../../constants/colors';
import descriptionForm from '../descriptionForm.slice';
import EditDescription from '../components/EditDescription';
import Avatar from '../components/Avatar';
import ChangePassword from '../components/ChangePassword';
import changePasswordForm from '../changePasswordForm.slice';
import { logOut } from '../actions';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(({ auth }) => auth.currentUser);
  const modalVisibility = useSelector(({ descriptionForm }) => descriptionForm.modalVisibility);
  const isEditing = useSelector(({ changePasswordForm }) => changePasswordForm.isEditing);

  const setModalVisibility = (value) => {
    dispatch(descriptionForm.actions.setModalVisibility(value));
  };

  const editPassword = () => {
    dispatch(changePasswordForm.actions.setEditing());
  };

  const closeSession = () => {
    dispatch(logOut());
  };

  const pencilIcon = <Icon type="simple-line-icon" name="pencil" size={15} color="white" />;

  return (
    <>
      <ScrollView style={styles.container}>
        <Avatar name={currentUser.name} />
        {currentUser.description?.length === 0 ? (
          <Text style={styles.noDescription}>
            "Presiona <Text style={styles.span}>Editar Descripción</Text> para agregar una
            descripcion tuya"
          </Text>
        ) : (
          <Text style={styles.description}>{currentUser.description}</Text>
        )}

        <Button
          icon={pencilIcon}
          onPress={() => {
            setModalVisibility(true);
          }}
        >
          Editar Descripción
        </Button>

        <View style={styles.lineBreak} />

        <Button onPress={editPassword}>Cambiar Contraseña</Button>

        <View style={styles.lineBreak} />

        {isEditing && <ChangePassword />}

        <View style={styles.lineBreak} />

        <Button onPress={closeSession} danger>
          Cerrar Sesion
        </Button>

        <View style={styles.botton} />
      </ScrollView>

      {modalVisibility && (
        <EditDescription
          close={() => {
            setModalVisibility(false);
          }}
          description={currentUser.description}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  description: {
    fontSize: 20,
    marginBottom: 40,
    color: COLORS.text,
  },
  noDescription: {
    fontSize: 20,
    marginBottom: 40,
    color: COLORS.text,
    textAlign: 'center',
  },
  span: {
    fontSize: 20,
    marginBottom: 40,
    color: COLORS.text,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  lineBreak: {
    height: 15,
  },
  botton: {
    height: 100,
  },
});

export default ProfileScreen;

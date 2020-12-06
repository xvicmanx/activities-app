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

export default () => {
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
    // dispatch(authSlice.actions.logOut());
  };

  const pencilIcon = <Icon type="simple-line-icon" name="pencil" size={15} color="white" />;

  return (
    <>
      <ScrollView style={styles.container}>
        <Avatar name={currentUser.name} />

        <Text style={styles.description}>{currentUser.description}</Text>

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
  lineBreak: {
    height: 15,
  },
  botton: {
    height: 100,
  },
});

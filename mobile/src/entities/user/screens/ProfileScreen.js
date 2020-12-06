import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Icon, Text } from 'react-native-elements';
// import { Avatar, Button, Input } from '../../common/components';
// import Avatar from '../../../common/components/Avatar';
import COLORS from '../../../constants/colors';
// import authSlice from '../auth/authSlice';
// import { updatePassword } from './actions';
// import userSlice from './userSlice';
// import validator from './validator';
// import EditDescription from './EditDescription';
import Avatar from '../components/Avatar';

export default () => {
  // const dispatch = useDispatch();
  const currentUser = useSelector(({ auth }) => auth.currentUser);
  // const state = useSelector((s) => s.user);
  // const repeatPasswordRef = useRef();
  // const newPasswordRef = useRef();
  // const setModalVisibility = (value) => {
  //   dispatch(userSlice.actions.setModalVisibility(value));
  // };
  // const onChange = (name, value) => {
  //   dispatch(
  //     userSlice.actions.handleChange({
  //       name,
  //       value,
  //     })
  //   );
  // };
  // const editPassword = () => {
  //   dispatch(userSlice.actions.setIsEditing());
  // };
  // const submit = () => {
  //   const { isValid, errors } = validator(state);
  //   if (!isValid) {
  //     dispatch(userSlice.actions.setErrors(errors));
  //     return;
  //   }
  //   const passwordsData = {
  //     previousPassword: state.previousPassword,
  //     password: state.password,
  //     confirmPassword: state.confirmPassword,
  //   };
  //   dispatch(updatePassword(passwordsData, currentUser.data.token));
  // };
  // const closeSession = () => {
  //   dispatch(authSlice.actions.logOut());
  // };

  return (
    <>
      <ScrollView style={styles.container}>
        <Avatar name={currentUser.name} />

        {/* 
        
        <Text style={styles.description}>{currentUser.data.description}</Text>
        <Button
          icon={<Icon type="simple-line-icon" name="pencil" size={15} color="white" />}
          onPress={() => {
            setModalVisibility(true);
          }}
        >
          Editar Descripción
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
              error={state.errors.password || (state.errors.confirmPassword && ' ')}
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
        
        */}
      </ScrollView>

      {/* 
      
      {state.modalVisibility && (
        <EditDescription
          close={() => {
            setModalVisibility(false);
          }}
          description={currentUser.data.description}
        />
      )} 
      
      */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },

  inputsContainer: {
    paddingTop: 50,
    marginBottom: 50,
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

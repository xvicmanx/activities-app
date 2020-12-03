import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Avatar as AvatarRNE, Text, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import { COLORS } from '../../constants';
import { uploadImage } from '../../entities/user/actions';
import { HOST } from '@env';

const Avatar = ({ size, img, name, edit }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((s) => s.auth.currentUser);

  const chooseImage = () => {
    const options = {
      title: 'Elegir Una Imagen',
      takePhotoButtonTitle: null,
      chooseFromLibraryButtonTitle: 'Galeria',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      cancelButtonTitle: 'Cancelar',
      noData: true,
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('<CANCELLED>');
      } else if (response.error) {
        console.log(response.error);
      } else if (response.customButton) {
        console.log(response.customButton);
      } else {
        dispatch(uploadImage(response, currentUser.data.token));
      }
    });
  };

  return (
    <View style={styles.container}>
      <AvatarRNE
        rounded
        source={{ uri: img.replace('localhost', HOST) }}
        size={size}
      />

      {edit && (
        <TouchableNativeFeedback onPress={chooseImage}>
          <View style={styles.pencilContainer}>
            <Icon size={16} name="pencil" type="octicon" color="#fff" />
          </View>
        </TouchableNativeFeedback>
      )}

      {name && <Text style={styles.text}>{name}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.dark,
  },
  pencilContainer: {
    backgroundColor: COLORS.primary,
    width: 30,
    height: 30,
    position: 'absolute',
    bottom: -5,
    right: -5,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Avatar;

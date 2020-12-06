import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import ImagePicker from 'react-native-image-picker';
import COLORS from '../../constants/colors';
import { updateImage } from '../../entities/user/actions';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';

export default ({ size, uri, name, edit }) => {
  const dispatch = useDispatch();
  const sizeImage = size || 50;

  const chooseImage = () => {
    const options = {
      title: 'Elegir una imagen',
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
        dispatch(updateImage(response));
      }
    });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri }}
        indicator={ProgressBar}
        style={{
          width: sizeImage,
          height: sizeImage,
        }}
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
  overlayContainer: {
    backgroundColor: COLORS.dark,
    flex: 1,
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

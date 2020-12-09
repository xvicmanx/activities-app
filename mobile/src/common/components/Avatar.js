import React from 'react';
import { View, StyleSheet, TouchableNativeFeedback, Image, ActivityIndicator } from 'react-native';
import { Text, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import * as ImagePicker from 'react-native-image-picker';
import { COLORS } from '../../constants';
import { updateImage, setImageLoader } from '../../entities/user/actions';
import defaultImage from '../../assets/images/avatar.png';

const Avatar = ({ size, uri, name, edit }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ user }) => user.imageProfile.isLoading);
  const displayPencil = useSelector(({ user }) => user.imageProfile.displayPencil);
  const error = useSelector(({ user }) => user.imageProfile.error);
  const imageSize = size || 60;

  const chooseImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo' }, (res) => {
      if (res.didCancel) return;
      dispatch(updateImage(res));
    });
  };

  const avatar =
    uri === null ? (
      <Image
        onLoad={() => dispatch(setImageLoader(false))}
        source={defaultImage}
        style={{ width: imageSize, height: imageSize }}
      />
    ) : (
      <Image
        onLoad={() => dispatch(setImageLoader(false))}
        source={{ uri }}
        style={{ width: imageSize, height: imageSize }}
      />
    );

  return (
    <>
      <View style={styles.container}>
        <View style={{ width: imageSize, height: imageSize }}>
          {avatar}
          {isLoading && (
            <View style={styles.overlayContainer}>
              <ActivityIndicator size={30} color={COLORS.primary} />
              {edit && <Text style={styles.loadingText}>Cargando...</Text>}
            </View>
          )}
        </View>
        {edit && displayPencil && (
          <TouchableNativeFeedback onPress={chooseImage}>
            <View style={styles.pencilContainer}>
              <Icon size={16} name="pencil" type="octicon" color="#fff" />
            </View>
          </TouchableNativeFeedback>
        )}

        {name && <Text style={styles.text}>{name}</Text>}
      </View>

      {edit && error && <Text style={styles.errorMessage}>{error}</Text>}
    </>
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
  overlayContainer: {
    backgroundColor: '#eee',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignContent: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 15,
    color: COLORS.primary,
  },
  errorMessage: {
    marginVertical: 15,
    color: COLORS.danger,
  },
});

export default Avatar;

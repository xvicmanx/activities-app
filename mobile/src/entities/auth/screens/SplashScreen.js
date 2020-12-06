import React from 'react';
import { StyleSheet, ActivityIndicator, ImageBackground, StatusBar } from 'react-native';
import COLORS from '../../../constants/colors';
import splash from '../../../assets/images/splash.jpeg';

export default () => (
  <>
    <StatusBar backgroundColor={COLORS.primary} />
    <ImageBackground source={splash} style={styles.image}>
      <ActivityIndicator size="large" color="#fff" style={styles.loader} />
    </ImageBackground>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  loader: {
    marginTop: 150,
  },
});

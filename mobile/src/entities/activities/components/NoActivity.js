import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../../constants/colors';

export default () => (
  <View style={styles.container}>
    <Text style={styles.text}>No hay actividades por el momento</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    width: 300,
    paddingVertical: 20,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  text: {
    fontSize: 17,
    color: '#fff',
    textAlign: 'center'
  },
});

import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import COLORS from '../../constants/colors';

export default () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color={COLORS.primary} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

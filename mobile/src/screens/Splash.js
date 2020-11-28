import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const Splash = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Splash</Text>
      <ActivityIndicator size="large" color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    marginBottom: 15,
  },
});

export default Splash;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoActivity = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 17 }}>No hay actividades por el momento</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ccc',
    width: 300,
    paddingVertical: 20,
    paddingHorizontal: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default NoActivity;

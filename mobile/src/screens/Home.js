import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { NoActivity } from '../components';

const Home = ({ navigation }) => {
  useEffect(() => {
    navigation.setOptions({ title: 'Actividades (0)' });
  }, []);

  return (
    <View style={styles.container}>
      <NoActivity />
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
});

export default Home;

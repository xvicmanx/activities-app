import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AvatarItem } from '../components';

const Community = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.communityName}>FDS 23</Text>

      <Text style={{ fontWeight: 'bold', marginBottom: 20, fontSize: 16 }}>
        Coordinadores:
      </Text>

      <AvatarItem name="Wally Trejo" />
      <AvatarItem name="Noelia Torrez" />

      <Text style={{ fontWeight: 'bold', marginBottom: 20, fontSize: 16 }}>
        Miembros:
      </Text>

      <AvatarItem name="Wally Trejo" />
      <AvatarItem name="Noelia Torrez" />
      <AvatarItem name="Wally Trejo" />
      <AvatarItem name="Noelia Torrez" />
      <AvatarItem name="Wally Trejo" />
      <AvatarItem name="Noelia Torrez" />
      <AvatarItem name="Wally Trejo" />
      <AvatarItem name="Noelia Torrez" />

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
  },
  communityName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Community;

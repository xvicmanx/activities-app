import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Avatar } from '../components';
import { useRoute } from '@react-navigation/native';

const OtherUserInfo = () => {
  const { params } = useRoute();

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Avatar size={75} />
        <Text style={styles.name}>{user.name}</Text>
      </View>

      <Text style={styles.description}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.{'\n\n'}Lorem Ipsum has been the industry's standard dummy text
        ever since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Text>

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
  name: {
    fontSize: 18,
    marginTop: 5,
  },
  description: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default OtherUserInfo;

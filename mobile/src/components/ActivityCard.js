import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ActivityCard = ({ item }) => {
  const { navigate } = useNavigation();

  const signup = () => {};

  const cancel = () => {};

  const seeWhoGoes = () => {
    navigate('ParticipantesListScreen', { activityId: item.id });
  };

  return (
    <View style={styles.container}>
      <Text>{item.title}</Text>
      <Text>{item.date}</Text>
      {item.userWillAttend && (
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginRight: 5 }}>Estas anotado</Text>
          <Ionicons name="checkmark-circle" size={20} color="green" />
        </View>
      )}

      <Text>{item.description}</Text>
      <Text style={{ color: 'blue' }} onPress={seeWhoGoes}>
        Ver quienes van ({item.willAttendCount})
      </Text>

      {item.userWillAttend ? (
        <Button danger onPress={cancel}>
          Cancelar
        </Button>
      ) : (
        <Button onPress={signup}>Anotarse</Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    padding: 15,
  },
});

export default ActivityCard;

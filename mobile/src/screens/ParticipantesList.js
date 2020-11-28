import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AvatarItem, Loader } from '../components';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticipants } from '../redux/activitiesSlice';

const ParticipantesList = () => {
  const dispatch = useDispatch();
  const { list, isLoading } = useSelector(
    (state) => state.activities.participants
  );
  const user = useSelector((state) => state.auth.user);
  const { navigate } = useNavigation();

  useEffect(() => {
    dispatch(fetchParticipants());
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      {list.map(() => {
        return (
          <AvatarItem
            name="Wally Trejo"
            onPress={() => navigate('OtherUserInfoScreen', {})}
          />
        );
      })}

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

export default ParticipantesList;

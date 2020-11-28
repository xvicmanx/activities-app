import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AvatarItem, Loader } from '../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParticipants } from '../redux/activitiesSlice';

const ParticipantesList = () => {
  const dispatch = useDispatch();
  const { list, isLoading } = useSelector(
    (state) => state.activities.participants
  );
  const user = useSelector((state) => state.auth.user);
  const { navigate } = useNavigation();
  const { params } = useRoute();

  useEffect(() => {
    dispatch(fetchParticipants(params.activityId, user.token));
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ScrollView style={styles.container}>
      {list.map(({ id, name, profileURL }) => {
        return (
          <AvatarItem
            key={id}
            name={name}
            img={profileURL}
            onPress={() => navigate('OtherUserInfoScreen', { id, name })}
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

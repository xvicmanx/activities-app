import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from '../../../common/components';
import { fetchParticipants } from '../actions';
import { ParticipantItem } from '../components';

const ParticipantsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const participants = useSelector((s) => s.activities.participants);
  const currentUser = useSelector((s) => s.auth.currentUser);
  const { activityId } = route.params;

  useEffect(() => {
    dispatch(fetchParticipants(activityId, currentUser.data.token));
  }, []);

  if (participants.isLoading) {
    return <Loader />;
  }

  const renderItem = ({ item }) => {
    return <ParticipantItem participant={item} />;
  };

  return (
    <FlatList
      style={styles.flatlist}
      keyExtractor={({ id }) => String(id)}
      data={participants.list}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  flatlist: {
    backgroundColor: '#fff',
  },
});

export default ParticipantsScreen;

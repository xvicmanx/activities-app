import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/components/Loader';
import { fetchParticipants, setLoaderParticipants } from '../actions';
import Participant from '../components/Participant';

const ParticipantsScreen = ({ route }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(({ participants }) => participants.isLoading);
  const list = useSelector(({ participants }) => participants.ids);
  const { activityId } = route.params;

  useEffect(() => {
    dispatch(fetchParticipants(activityId));

    return () => {
      dispatch(setLoaderParticipants(true));
    };
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const renderItem = ({ item }) => {
    return <Participant participantId={item} />;
  };

  return (
    <FlatList
      style={styles.flatlist}
      keyExtractor={(item) => String(item)}
      data={list}
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

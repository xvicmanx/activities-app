import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Loader, ListItem } from '../../../common/components';
import { fetchParticipants } from '../actions';

const ParticipantsScreen = ({ route, navigation }) => {
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
    return (
      <ListItem
        item={item}
        onPress={() => {
          navigation.navigate('SpecificUserScreen', {
            id: item.id,
            name: item.name,
          });
        }}
      />
    );
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
